// API Client simplificado con métodos estáticos

export interface ApiResponse<T> {
  data?: T;
  message: string;
  success: boolean;
  statusCode: number;
  statusMessage: string;
}

class ApiClient {
  private static authToken: string | null = null;

  // Configurar token de autenticación
  static setAuthToken(token: string) {
    this.authToken = token;
  }

  // Remover token de autenticación
  static removeAuthToken() {
    this.authToken = null;
  }

  // Obtener headers por defecto
  private static getDefaultHeaders(): Record<string, string> {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };

    if (this.authToken) {
      headers.Authorization = `Bearer ${this.authToken}`;
    }

    return headers;
  }

  // Método principal para hacer requests
  static async request<T>(
    url: string,
    data?: any,
    headers?: Record<string, string>,
    method: string = "GET"
  ): Promise<ApiResponse<T>> {
    try {
      const finalHeaders = {
        ...this.getDefaultHeaders(),
        ...headers,
      };

      const config: RequestInit = {
        method,
        headers: finalHeaders,
      };

      // Agregar body solo si hay data y no es GET/DELETE
      if (data && method !== "GET" && method !== "DELETE") {
        config.body = JSON.stringify(data);
      }

      const response = await fetch(url, config);
      const responseData = await response.json();
      console.log("Response Data:", responseData);
      // Si la respuesta del servidor ya tiene el formato ResponseData<T>
      if ("success" in responseData && "statusCode" in responseData) {
        return {
          success: responseData.Success,
          data: responseData.Data,
          message: responseData.Message || "",
          statusCode: responseData.StatusCode,
          statusMessage: responseData.StatusMessage || "",
        };
      }

      // Para respuestas sin el formato ResponseData
      if (!response.ok) {
        return {
          success: false,
          data: undefined,
          message: responseData.Message || `HTTP Error ${response.status}`,
          statusCode: response.status,
          statusMessage: response.statusText,
        };
      }

      return {
        success: true,
        data: responseData,
        message: responseData.message || "Success",
        statusCode: response.status,
        statusMessage: response.statusText,
      };
    } catch (error) {
      return {
        success: false,
        data: undefined,
        message: error instanceof Error ? error.message : "Network error",
        statusCode: 500,
        statusMessage: "Network Error",
      };
    }
  }

  // Métodos HTTP simplificados
  static async get<T>(
    url: string,
    headers?: Record<string, string>
  ): Promise<ApiResponse<T>> {
    return this.request<T>(url, undefined, headers, "GET");
  }

  static async post<T>(
    url: string,
    data?: any,
    headers?: Record<string, string>
  ): Promise<ApiResponse<T>> {
    return this.request<T>(url, data, headers, "POST");
  }

  static async put<T>(
    url: string,
    data?: any,
    headers?: Record<string, string>
  ): Promise<ApiResponse<T>> {
    return this.request<T>(url, data, headers, "PUT");
  }

  static async patch<T>(
    url: string,
    data?: any,
    headers?: Record<string, string>
  ): Promise<ApiResponse<T>> {
    return this.request<T>(url, data, headers, "PATCH");
  }

  static async delete<T>(
    url: string,
    headers?: Record<string, string>
  ): Promise<ApiResponse<T>> {
    return this.request<T>(url, undefined, headers, "DELETE");
  }

  // Método para upload de archivos
  static async upload<T>(
    url: string,
    file: File,
    additionalData?: Record<string, any>,
    headers?: Record<string, string>
  ): Promise<ApiResponse<T>> {
    try {
      const formData = new FormData();
      formData.append("file", file);

      if (additionalData) {
        Object.entries(additionalData).forEach(([key, value]) => {
          formData.append(key, String(value));
        });
      }

      // No incluir Content-Type para FormData, el navegador lo configurará automáticamente
      const finalHeaders: Record<string, string> = {
        ...(headers as Record<string, string>),
      };
      if (this.authToken) {
        finalHeaders.Authorization = `Bearer ${this.authToken}`;
      }

      const config: RequestInit = {
        method: "POST",
        body: formData,
        headers: finalHeaders,
      };

      const response = await fetch(url, config);
      const responseData = await response.json();

      if ("success" in responseData && "statusCode" in responseData) {
        return responseData;
      }

      if (!response.ok) {
        return {
          success: false,
          data: undefined,
          message: responseData.message || `Upload failed: ${response.status}`,
          statusCode: response.status,
          statusMessage: response.statusText,
        };
      }

      return {
        success: true,
        data: responseData,
        message: "Upload successful",
        statusCode: response.status,
        statusMessage: response.statusText,
      };
    } catch (error) {
      return {
        success: false,
        data: undefined,
        message: error instanceof Error ? error.message : "Upload error",
        statusCode: 500,
        statusMessage: "Upload Error",
      };
    }
  }
}

export default ApiClient;
