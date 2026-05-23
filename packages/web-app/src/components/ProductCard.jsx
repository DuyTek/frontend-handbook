export const ProductCard = ({ id, name, price, rating, image, category }) => {
    return (
        <li key={id} className="product-card" style={{ display: 'flex', alignItems: 'flex-start' }}>
            <img src={image.src} alt={name} height={'120px'} width={'120px'} style={{ objectFit: 'fill' }} />
            <div style={{ display: 'flex' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                    <p>{name}</p>
                    <p>{rating}</p>
                    <p>{'#' + category}</p>
                </div>
                <p>{price}</p>
            </div>
        </li>
    )
}