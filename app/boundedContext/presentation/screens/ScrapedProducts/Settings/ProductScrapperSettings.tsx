import React from 'react';
import {View} from 'react-native';
import ScraperSettings from '@domains/scrapedProducts/presentation/ScraperSettingsForm';
import ScraperRules from '@domains/scraperRules/presentation/ScraperRulesForm';

function ProductScrapperSettings() {
  return (
    <View style={{flex: 1}}>
      <ScraperSettings />
      <ScraperRules />
    </View>
  );
}

export default ProductScrapperSettings;
