const ListItem = props => {
    const { listType, city, isInFavorites, toggleFavoriteCity } = props
    return (
        <>
            <div className={`item ui ${listType === 'favorites' ? 'card favorite-item five wide column' : 'search-result'} `}
                key={city.id}>
                <div
                    className="header"
                    onClick={() => props.onSelect(city)}
                    tabIndex="0">
                    {listType === 'fonselectavorites' ? <> <h3><i className={`${city.Country.ID.toLowerCase()} flag`}></i>{city.LocalizedName}</h3>
                        <h5>See Forecast</h5></> : <>
                        <p><i className={`${city.Country.ID.toLowerCase()} flag`}></i>{city.LocalizedName}</p></>}
                </div>
                {listType === 'favorites' && <div className="ui clearing divider">
                </div>}
                <div
                    className="description"
                    onClick={() => toggleFavoriteCity(city)}
                >
                    <i className="plus circle icon"></i>
                    {isInFavorites ? 'Remove from Favorites' : 'Add to Favorites'}
                </div>
            </div>
        </>
    )
}

export default ListItem