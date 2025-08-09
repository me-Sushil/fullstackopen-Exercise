const Filter=({search, setSearch})=>{
    return(
        <>
        <p>
        filter shown with
        <input
          placeholder="Search by name"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
      </p>
        </>
    )
}
export default Filter;