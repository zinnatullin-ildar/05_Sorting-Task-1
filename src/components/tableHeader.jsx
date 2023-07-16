import PropTypes from "prop-types";

const TableHeader = ({ onSort, selectedSort, columns }) => {
    const handleSort = (item) => {
        if (selectedSort.path === item) {
            onSort({
                ...selectedSort,
                order: selectedSort.order === "asc" ? "desc" : "asc"
            });
        } else {
            onSort({
                path: item,
                order: "asc"
            });
        } // логика сортировки при повторном нажатии и/или нажатии на другой заголовок
    };

    return (
        <thead>
            <tr>
                {/* динамическое отображение колонок */}
                {Object.keys(columns).map((column) => (
                    <th
                        key={column}
                        onClick={
                            columns[column].path
                                ? () => handleSort(columns[column].path)
                                : undefined
                        } // возможность сортировать элементы в колонках только при наличии итератора
                        {...{ role: columns[column].path && "button" }} // при наличии итератора добавляется поведение указателя мыши
                        scope="col"
                    >
                        {columns[column].name}
                        {selectedSort.path === columns[column].path ? (
                            <i
                                className={
                                    selectedSort.order === "asc"
                                        ? "bi bi-caret-up-fill"
                                        : "bi bi-caret-down-fill"
                                }
                            />
                        ) : null}
                    </th>
                ))}
                {/* <th onClick={() => handleSort("name")} scope="col">
                    Имя
                </th>
                <th scope="col">Качества</th>
                <th onClick={() => handleSort("profession.name")} scope="col">
                    Профессия
                </th>
                <th onClick={() => handleSort("completedMeetings")} scope="col">
                    Встретился, раз
                </th>
                <th onClick={() => handleSort("rate")} scope="col">
                    Оценка
                </th>
                <th onClick={() => handleSort("bookmark")} scope="col">
                    Избранное
                </th>
                <th /> */}
            </tr>
        </thead>
    );
};

TableHeader.propTypes = {
    onSort: PropTypes.func.isRequired,
    selectedSort: PropTypes.object.isRequired,
    columns: PropTypes.object.isRequired
};

export default TableHeader;
