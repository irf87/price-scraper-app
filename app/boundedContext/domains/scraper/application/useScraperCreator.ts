import {useState, useEffect} from 'react';

import {
  useGetSelectorsByUrl,
  useGetProductDetailBySelectors,
  DEFAULT_PROPS_PRODUCT_DETAIL,
} from '@domains/scraper/application/usePrepareScraper';

import {useProductSearch} from '@domains/products/application/useProductSearch';
import {useCreateProduct} from '@domains/products/application/useProducts';
import {useScraperMutation} from '@domains/scraper/application/useScraperMutation';
import {useScraperRuleMutation} from '@domains/scraperRules/application/useScraperRules';

export interface FormData {
  priceDomSelector: string;
  stockDomSelector?: string;
  availableDomSelector?: string;
  priceLessThan?: string;
  priceGreaterThan?: string;
  notifyAvailability?: boolean;
  notifyPrice?: boolean;
  notifyStock?: boolean;
}

const useScraperCreator = () => {
  const [url, setUrl] = useState<string | undefined>();
  const [productId, setProductId] = useState<number | undefined>();

  const {createScraper, createScraperState} = useScraperMutation();
  const {createProduct, createProductState} = useCreateProduct();
  const {createScraperRule, createScraperRuleState} = useScraperRuleMutation();
  const {selectors, selectorsState, setUrlAndRefetch, clearSelectorsQueryData} =
    useGetSelectorsByUrl(url);

  const {
    productDetail,
    productDetailState,
    setPropsAndRefetch,
    clearProductDetailQueryData,
  } = useGetProductDetailBySelectors(DEFAULT_PROPS_PRODUCT_DETAIL);

  const {setSearchTerm, searchTerm, searchResults} = useProductSearch();

  const getDataByUrl = async () => {
    if (!url) {
      return null;
    }
    const selectorsResponse = await setUrlAndRefetch(url);
    if (selectorsResponse?.data) {
      if (selectorsResponse.data?.productNameDomSelector) {
        const productResponse = await setPropsAndRefetch({
          url,
          gettingMode: selectorsResponse.data.gettingMode,
          productNameDomSelector: selectorsResponse.data.productNameDomSelector,
          productDescriptionDomSelector:
            selectorsResponse.data?.productDescriptionDomSelector,
          imageProductDomSelector:
            selectorsResponse.data?.imageProductDomSelector,
        });
        setSearchTerm(productResponse.name);
      }
      return selectorsResponse?.data;
    }
    return null;
  };

  const handleCreateScraper = async (data: FormData) => {
    if (!url || !selectors) {
      return null;
    }
    let linkedProductId = productId;

    if (!productId && productDetail) {
      const newProduct = await createProduct({
        name: productDetail.name,
        description: productDetail.description,
        urlImg: productDetail.urlImg,
        urlInfo: '',
      });
      linkedProductId = newProduct.id;
    }
    if (!linkedProductId) {
      return null;
    }

    const scraperCreated = await createScraper({
      urlToScrape: url,
      productId: linkedProductId,
      priceDomSelector: data.priceDomSelector,
      stockDomSelector: data?.stockDomSelector || '',
      availableDomSelector: data?.availableDomSelector || '',
      enable: true,
      gettingMode: selectors.gettingMode,
    });

    if (!scraperCreated.id) {
      return null;
    }

    await createScraperRule({
      productScrapedId: scraperCreated.id,
      match: '',
      notifyWhenIsAvailable: true,
      notifyPriceMoreEqualThan: Number(data.priceGreaterThan),
      notifyPriceSmallerEqualThan: Number(data.priceLessThan),
      notifyStockChanges: data?.notifyStock || false,
      notifyPriceChanges: data?.notifyPrice || false,
      notifyAvailabilityChanges: data?.notifyAvailability || false,
    });

    return {
      scraperId: scraperCreated.id,
      productId: linkedProductId,
    };
  };

  useEffect(() => {
    return () => {
      clearProductDetailQueryData();
      clearSelectorsQueryData();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    getDataByUrl,
    isLoadingGetDataByUrl:
      selectorsState.isFetching || productDetailState.isFetching,
    wasAutoSearched: Boolean(searchTerm && productDetailState.isFetched),
    productsFound: searchResults || [],
    productDetail,
    productId,
    url,
    creatingScraper:
      createScraperState.isLoading ||
      createProductState.isLoading ||
      createScraperRuleState.isLoading,
    setUrl,
    handleCreateScraper,
    setProductId,
    resetProductSearch: () => setSearchTerm(''),
  };
};

export default useScraperCreator;
