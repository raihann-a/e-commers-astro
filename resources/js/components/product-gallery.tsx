export function ProductGallery({ image }) {
    return (
        <div className="flex flex-col gap-4">
            {/* Main Image */}
            <div className="overflow-hidden rounded-2xl bg-[#F5F5F7]">
                <img
                    src={image}
                    alt="Product"
                    className="h-96 w-full object-cover"
                />
            </div>

            {/* Thumbnails (optional - for future multi-image support) */}
            <div className="grid grid-cols-4 gap-2">
                {[image].map((img, index) => (
                    <div
                        key={index}
                        className="overflow-hidden rounded-lg border-2 border-[#3B82F6]"
                    >
                        <img
                            src={img}
                            alt={`thumbnail-${index}`}
                            className="h-24 w-full object-cover"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}
