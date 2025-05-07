// API istekleri için yardımcı fonksiyonlar
const API_URL = "http://localhost:3002";

// API isteği atacak temel fonksiyon
async function fetchAPI(endpoint: string, options: RequestInit = {}) {
  const token = localStorage.getItem("token");
  
  // Varsayılan ayarları belirleme
  const defaultOptions: RequestInit = {
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers || {})
    }
  };
  
  // Options'ları birleştirme
  const fetchOptions = {
    ...defaultOptions,
    ...options,
    headers: {
      ...defaultOptions.headers,
      ...(options.headers || {})
    }
  };
  
  try {
    const response = await fetch(`${API_URL}${endpoint}`, fetchOptions);
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || "Bir hata oluştu");
    }
    
    return data;
  } catch (error) {
    console.error("API isteği başarısız:", error);
    throw error;
  }
}

// Kimlik doğrulama işlemleri
export const authAPI = {
  // Kullanıcı kaydı
  register: async (userData: { name: string, email: string, password: string }) => {
    return fetchAPI("/auth/register", {
      method: "POST",
      body: JSON.stringify(userData)
    });
  },
  
  // Kullanıcı girişi
  login: async (credentials: { email: string, password: string }) => {
    return fetchAPI("/auth/login", {
      method: "POST",
      body: JSON.stringify(credentials)
    });
  },
  
  // Kullanıcı bilgilerini getirme
  me: async () => {
    return fetchAPI("/auth/me");
  },
  
  // Email doğrulama
  verifyEmail: async (token: string) => {
    return fetchAPI(`/auth/verify-email/${token}`);
  },
  
  // Email doğrulama linki yeniden gönderme
  resendVerificationEmail: async () => {
    return fetchAPI("/auth/resend-verification", {
      method: "POST"
    });
  }
};

// Post (Entry) işlemleri
export const postAPI = {
  // Tüm gönderileri getir
  getPosts: async () => {
    return fetchAPI("/posts");
  },
  
  // Belirli bir gönderiyi getir
  getPost: async (id: string) => {
    return fetchAPI(`/posts/${id}`);
  },
  
  // Kullanıcının kendi gönderilerini getir
  getUserPosts: async (userId: string) => {
    return fetchAPI(`/posts/user/${userId}`);
  },
  
  // Kullanıcının beğendiği gönderileri getir
  getLikedPosts: async () => {
    return fetchAPI("/posts/liked");
  },
  
  // Yeni gönderi oluştur
  createPost: async (postData: { title: string, description: string, tag: string }) => {
    return fetchAPI("/posts", {
      method: "POST",
      body: JSON.stringify(postData)
    });
  },
  
  // Gönderi güncelle
  updatePost: async (id: string, postData: { title?: string, description?: string, tag?: string }) => {
    return fetchAPI(`/posts/${id}`, {
      method: "PUT",
      body: JSON.stringify(postData)
    });
  },
  
  // Gönderi sil
  deletePost: async (id: string) => {
    return fetchAPI(`/posts/${id}`, {
      method: "DELETE"
    });
  },
  
  // Gönderiyi beğen/beğenme
  likePost: async (id: string) => {
    return fetchAPI(`/posts/${id}/like`, {
      method: "POST"
    });
  }
};

// Yorum işlemleri
export const commentAPI = {
  // Gönderiye ait yorumları getir
  getComments: async (postId: string) => {
    return fetchAPI(`/posts/${postId}/comments`);
  },
  
  // Yorum ekle
  createComment: async (postId: string, content: string) => {
    return fetchAPI(`/posts/${postId}/comments`, {
      method: "POST",
      body: JSON.stringify({ content })
    });
  },
  
  // Yorum sil
  deleteComment: async (id: string) => {
    return fetchAPI(`/comments/${id}`, {
      method: "DELETE"
    });
  },
  
  // Yorumu beğen/beğenme
  likeComment: async (id: string) => {
    return fetchAPI(`/comments/${id}/like`, {
      method: "POST"
    });
  }
};

// Kullanıcı işlemleri
export const userAPI = {
  // Kullanıcı bilgilerini getir
  getUser: async (id: string) => {
    return fetchAPI(`/users/${id}`);
  },
  
  // Kullanıcı bilgilerini güncelle
  updateUser: async (id: string, userData: { name?: string, email?: string, avatar?: string }) => {
    return fetchAPI(`/users/${id}`, {
      method: "PUT",
      body: JSON.stringify(userData)
    });
  }
}; 