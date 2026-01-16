"use server";
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
import api from "../api/axios";

export const getProduct = async (id: string): Promise<GetProductResponse> => {
  try {
    const response = await api.get<GetProductResponse>(
      `/api/services/app/ProductService/GetById?id=${id}`
    );
    return response.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("Error fetching product:", error?.response?.data);
    return (
      error?.response?.data || {
        success: false,
        error: {
          message: error?.response?.data?.error?.message || error?.message,
          details: error?.response?.data?.error?.details,
        },
      }
    );
  }
};

export const getAllProducts = async (params: {
  SkipCount?: number;
  MaxResultCount?: number;
}): Promise<GetAllProductsResponse> => {
  try {
    const response = await api.get<GetAllProductsResponse>(
      `/api/services/app/ProductService/GetAll`,
      {
        params,
      }
    );
    return response.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("Error fetching products:", error?.response?.data);
    return (
      error?.response?.data || {
        success: false,
        error: {
          message: error?.response?.data?.error?.message || error?.message,
          details: error?.response?.data?.error?.details,
        },
      }
    );
  }
};

export const createProduct = async (
  body: CreateProductBody
): Promise<CreateProductResponse> => {
  try {
    const response = await api.post<CreateProductResponse>(
      `/api/services/app/ProductService/Create`,
      body
    );
    return response.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("Error creating product:", error?.response?.data);
    return (
      error?.response?.data || {
        success: false,
        error: {
          message: error?.response?.data?.error?.message || error?.message,
          details: error?.response?.data?.error?.details,
        },
      }
    );
  }
};

export const updateProduct = async (
  id: string,
  body: CreateProductBody
): Promise<CreateProductResponse> => {
  try {
    const response = await api.put<CreateProductResponse>(
      `/api/services/app/ProductService/Update?id=${id}`,
      body
    );
    return response.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("Error updating product:", error?.response?.data);
    return (
      error?.response?.data || {
        success: false,
        error: {
          message: error?.response?.data?.error?.message || error?.message,
          details: error?.response?.data?.error?.details,
        },
      }
    );
  }
};

export const deleteProduct = async (
  id: string
): Promise<DeleteProductResponse> => {
  try {
    const response = await api.delete<DeleteProductResponse>(
      `/api/services/app/ProductService/Delete?id=${id}`
    );
    return response.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("Error deleting product:", error?.response?.data);
    return (
      error?.response?.data || {
        success: false,
        error: {
          message: error?.response?.data?.error?.message || error?.message,
          details: error?.response?.data?.error?.details,
        },
      }
    );
  }
};

export const getProductCategory = async (
  id: number
): Promise<GetProductCategoryResponse> => {
  try {
    const response = await api.get<GetProductCategoryResponse>(
      `/api/services/app/ProductCategoryService/GetById?id=${id}`
    );
    console.log(response.data);

    return response.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("Error fetching product category:", error?.response?.data);
    return (
      error?.response?.data || {
        success: false,
        error: {
          message: error?.response?.data?.error?.message || error?.message,
          details: error?.response?.data?.error?.details,
        },
      }
    );
  }
};

export const getAllProductCategories = async (params: {
  SkipCount?: number;
  MaxResultCount?: number;
}): Promise<GetAllProductCategoriesResponse> => {
  try {
    const response = await api.get<GetAllProductCategoriesResponse>(
      `/api/services/app/ProductCategoryService/GetAll`,
      {
        params,
      }
    );
    return response.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("Error fetching product categories:", error?.response?.data);
    return (
      error?.response?.data || {
        success: false,
        error: {
          message: error?.response?.data?.error?.message || error?.message,
          details: error?.response?.data?.error?.details,
        },
      }
    );
  }
};

export const createProductCategory = async (
  body: CreateProductCategoryBody
): Promise<CreateProductCategoryResponse> => {
  try {
    const response = await api.post<CreateProductCategoryResponse>(
      `/api/services/app/ProductCategoryService/Create`,
      body
    );
    return response.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("Error creating product category:", error?.response?.data);
    return (
      error?.response?.data || {
        success: false,
        error: {
          message: error?.response?.data?.error?.message || error?.message,
          details: error?.response?.data?.error?.details,
        },
      }
    );
  }
};

export const updateProductCategory = async (
  id: number,
  body: CreateProductCategoryBody
): Promise<CreateProductCategoryResponse> => {
  try {
    const response = await api.put<CreateProductCategoryResponse>(
      `/api/services/app/ProductCategoryService/Update?id=${id}`,
      body
    );
    return response.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("Error updating product category:", error?.response?.data);
    return (
      error?.response?.data || {
        success: false,
        error: {
          message: error?.response?.data?.error?.message || error?.message,
          details: error?.response?.data?.error?.details,
        },
      }
    );
  }
};

export const deleteProductCategory = async (
  id: number
): Promise<DeleteProductCategoryResponse> => {
  try {
    const response = await api.delete<DeleteProductCategoryResponse>(
      `/api/services/app/ProductCategoryService/Delete?id=${id}`
    );
    return response.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("Error deleting product category:", error?.response?.data);
    return (
      error?.response?.data || {
        success: false,
        error: {
          message: error?.response?.data?.error?.message || error?.message,
          details: error?.response?.data?.error?.details,
        },
      }
    );
  }
};
