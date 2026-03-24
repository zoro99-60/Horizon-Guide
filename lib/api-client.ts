/**
 * @deprecated Legacy API client. 
 * High Priority: Migrate all methods to use the Supabase client directly.
 */
const API_BASE_URL = "/api/legacy-proxy" // Redirecting to ensure we don't accidentally call the old local backend

export async function fetchFromApi<T>(endpoint: string, options?: RequestInit): Promise<T> {
    try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, options)
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}))
            throw new Error(errorData.message || `API error: ${response.status} ${response.statusText}`)
        }
        return response.json()
    } catch (error: any) {
        console.error(`Fetch error for ${endpoint}:`, error)
        throw error
    }
}

export const api = {
    getDomains: () => fetchFromApi<any[]>("/domains"),
    getDomainById: (id: string) => fetchFromApi<any>(`/domains/${id}`),
    getStats: () => fetchFromApi<any[]>("/stats"),
    getTestimonials: () => fetchFromApi<any[]>("/testimonials"),
    getFeatures: () => fetchFromApi<any[]>("/features"),
    getHowItWorks: () => fetchFromApi<any[]>("/how-it-works"),
    getDiscussions: (domain?: string) =>
        fetchFromApi<any[]>(`/discussions${domain ? `?domain=${domain}` : ""}`),
    getQuizQuestions: () => fetchFromApi<any[]>("/quiz"),
    getRoadmap: (domainId: string) => fetchFromApi<any>(`/roadmaps/${domainId}`),
    getCompanies: (domainId: string) => fetchFromApi<any[]>(`/companies/${domainId}`),

    // Auth & 2FA
    register: (data: any) => fetchFromApi<any>("/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    }),
    login: (data: any) => fetchFromApi<any>("/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    }),
    setup2FA: (userId: string) => fetchFromApi<any>("/auth/2fa/setup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId }),
    }),
    verify2FA: (data: { userId: string, token: string }) => fetchFromApi<any>("/auth/2fa/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    }),
}
