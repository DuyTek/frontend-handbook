export const SearchInput = ({ value, onChangeCallback }) => {
    return (
        <>
            <label>Search something</label>
            <input type="search" name="product" value={value} onChange={onChangeCallback} />
        </>
    )
}