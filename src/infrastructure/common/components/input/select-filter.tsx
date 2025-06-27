import "../../../../assets/styles/components/input.css"
type Props = {
    label: string,
    listDataOfItem: Array<any>,
    onChange: any
}

const SelectFilterCommon = (props: Props) => {
    const {
        listDataOfItem,
        label,
        onChange
    } = props;
    return (
        <div className='input-text-common'>
            {
                label
                &&
                <div className='title'>{label}</div>
            }
            <select onChange={onChange}>
                {
                    listDataOfItem && listDataOfItem.length && listDataOfItem.map((item, index) => {
                        return (
                            <option key={index} value={item.value}>{item.label}</option>
                        )
                    })
                }
            </select>
        </div>
    )
}

export default SelectFilterCommon