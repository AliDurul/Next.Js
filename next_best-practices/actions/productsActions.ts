'use server'

export const getProducts = async (page: number = 1, limit: number = 10, search?: string | undefined) => {

    const skip = (page - 1) * limit
    let url = `https://dummyjson.com/products?limit=${limit}&skip=${skip}`

    if (search) url = `https://dummyjson.com/products/search?q=${search}&limit=${limit}&skip=${skip}`
    
    try {
        const response = await fetch(url);

        if (!response.ok) throw new Error('Network response was not ok');

        const data = await response.json();
        return data;

    } catch (error) {

        return error instanceof Error ? { error: error.message } : { error: 'An unknown error occurred' }

    }
}