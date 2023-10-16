import { Table as ATable } from "antd";
import { ComponentProps, FC } from "react";

type TableProps = ComponentProps<typeof ATable>;

const Table: FC<TableProps> = (props) => {
	return <ATable {...props} />;
};

export default Table;
