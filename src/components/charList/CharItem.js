

const CharItem = ({thumbnail, name, id, onClick, className}) => {
    return (
    <li className="char__item" key={id} onClick={onClick}>
                    <img src={thumbnail} alt="abyss" className={className}/>
                    <div className="char__name">{name}</div>
    </li>
    )
}


export default CharItem