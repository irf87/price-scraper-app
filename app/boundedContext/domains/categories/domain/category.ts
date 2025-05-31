export interface CategoryAssignedToProduct {
  productId: number;
  categoryId: number;
  createdAt: string;
  updatedAt: string;
  productName: string;
  categoryName: string;
  categoryDescription?: string;
}
