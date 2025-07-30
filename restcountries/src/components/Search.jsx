export function Search({ searchTerm, onChange }) {

  return (
      <div>
          <input  value={searchTerm}
                  onChange={onChange}
                  type="text"
                  placeholder="Search here..."/>
      </div>
  )
}