import { useState } from "react";

const ImageGrid = ({ images }) => {
  const [selected, setSelected] = useState([]);

  const toggleSelect = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  return (
    <div className="p-4">
      <div className="mb-4 font-medium">Selected: {selected.length}</div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {images.map((img) => (
          <div key={img.id} className="relative">
            <img
              src={img.urls.small}
              alt={img.alt_description}
              className="w-full h-40 object-cover rounded"
            />
            <input
              type="checkbox"
              className="absolute top-2 left-2 scale-150"
              checked={selected.includes(img.id)}
              onChange={() => toggleSelect(img.id)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageGrid;
