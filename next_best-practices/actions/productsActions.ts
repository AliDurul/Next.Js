'use server'

export const getProducts = async (page: number = 1, limit: number = 10) => {

    const skip = (page - 1) * limit

    try {
        const response = await fetch(`https://dummyjson.com/products?limit=${limit}&skip=${skip}`);

        if (!response.ok) throw new Error('Network response was not ok');

        const data = await response.json();
        return data;

    } catch (error) {

        return error instanceof Error ? { error: error.message } : { error: 'An unknown error occurred' }

    }
}