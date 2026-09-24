const API_BASE = 'https://machamp-supplements.lat/api/v1';

function getToken() {
    return localStorage.getItem('token');
}

export async function apiFetch(path, options = {}) {
    const headers = {
        'Content-Type': 'application/json',
        ...(options.headers || {}),
    };

    const token = getToken();
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    const res = await fetch(`${API_BASE}${path}`, {
        ...options,
        headers,
        credentials: 'include',
    });

    let data = null;
    try {
        data = await res.json();
    } catch {
        data = null;
    }

    if (!res.ok) {
        const error = new Error(data?.error || 'Error en la petición');
        error.status = res.status;
        error.data = data;
        throw error;
    }

    return data;
}

export async function getCsrfToken() {
    const data = await apiFetch('/csrf-token');
    return data.csrfToken;
}

export async function apiFetchWithCsrf(path, options = {}) {
    const csrfToken = await getCsrfToken();
    return apiFetch(path, {
        ...options,
        headers: {
            ...(options.headers || {}),
            'csrf-token': csrfToken,
        },
    });
}
