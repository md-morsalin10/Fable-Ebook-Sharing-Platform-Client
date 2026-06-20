
const baseUrl = process.env.NEXT_PUBLIC_URL

export const createBook = async (bookData) => {
    const res = await fetch(`${baseUrl}/api/books`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(bookData)
    })
    return res.json()
}

