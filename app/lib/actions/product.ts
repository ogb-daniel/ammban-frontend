import {
  CreateProductBody,
  CreateProductCategoryBody,
  CreateProductCategoryResponse,
  CreateProductResponse,
  DeleteProductCategoryResponse,
  DeleteProductResponse,
  GetAllProductCategoriesResponse,
  GetAllProductsResponse,
  GetProductCategoryResponse,
  GetProductResponse,
} from "../definitions";

export const getProduct = async (id: string): Promise<GetProductResponse> => {
  const response = await fetch(`/api/productService?id=${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch product");
  }

  return response.json();
};

export const getAllProducts = async (
  params: string
): Promise<GetAllProductsResponse> => {
  const response = await fetch(`/api/productService?${params}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  return response.json();
};

export const createProduct = async (
  body: CreateProductBody
): Promise<CreateProductResponse> => {
  const response = await fetch(`/api/productService`, {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to create product");
  }

  return response.json();
};

export const updateProduct = async (
  id: string,
  body: CreateProductBody
): Promise<CreateProductResponse> => {
  const response = await fetch(`/api/productService?id=${id}`, {
    method: "PUT",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to update product");
  }

  return response.json();
};

export const deleteProduct = async (
  id: string
): Promise<DeleteProductResponse> => {
  const response = await fetch(`/api/productService?id=${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to delete product");
  }
  return response.json();
};

export const getProductCategory = async (
  id: string
): Promise<GetProductCategoryResponse> => {
  const response = await fetch(`/api/productCategory?id=${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch product category");
  }

  return response.json();
};

export const getAllProductCategories = async (
  params: string
): Promise<GetAllProductCategoriesResponse> => {
  const response = await fetch(`/api/productCategory?${params}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch product categories");
  }

  return response.json();
};

export const createProductCategory = async (
  body: CreateProductCategoryBody
): Promise<CreateProductCategoryResponse> => {
  const response = await fetch(`/api/productCategory`, {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to create product category");
  }

  return response.json();
};

export const updateProductCategory = async (
  id: string,
  body: CreateProductCategoryBody
): Promise<CreateProductCategoryResponse> => {
  const response = await fetch(`/api/productCategory?id=${id}`, {
    method: "PUT",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to update product category");
  }

  return response.json();
};

export const deleteProductCategory = async (
  id: string
): Promise<DeleteProductCategoryResponse> => {
  const response = await fetch(`/api/productCategory?id=${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to delete product category");
  }
  return response.json();
};
