export default async function Albums({ albums }: { albums: { id: number, title: string }[] }) {

    return (
        <div className="bg-gray-900 text-gray-100 p-5 mt-8 rounded-lg">
            <h2 className="text-lg font-semibold mb-3">Albums</h2>
            <ul className="space-y-2">
                {albums.map((album) => (
                    <li key={album.id} className="bg-gray-800 p-3 rounded shadow-md">
                        {album.title}
                    </li>
                ))}
            </ul>
        </div>
    )
}