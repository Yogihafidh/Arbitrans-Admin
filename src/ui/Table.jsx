import { createContext, useContext } from "react";

const TableContext = createContext();
function Table({ columns, children }) {
  return (
    <TableContext.Provider value={{ columns }}>
      <div
        role="table"
        className="border-netral-400 w-fit border-2 text-sm"
      >
        {children}
      </div>
    </TableContext.Provider>
  );
}
function Header({ children }) {
  const { columns } = useContext(TableContext);
  return (
    <div
      role="row"
      as="header"
      style={{ gridTemplateColumns: columns }}
      className={`divide-netral-400 border-netral-400 text-netral-900 grid items-stretch divide-x-2 border-b-2 text-center font-medium`}
    >
      {children}
    </div>
  );
}

function Body({ data, render, isLoading }) {
  if ((data.length === 0) | isLoading)
    return (
      <p className="px-6 py-4">Tidak ada data yang ditampilkan saat ini</p>
    );

  return <div className="divide-netral-400 divide-y-2">{data.map(render)}</div>;
}

function Row({ children }) {
  const { columns } = useContext(TableContext);
  return (
    <div
      role="row"
      style={{ gridTemplateColumns: columns }}
      className={`divide-netral-400 text-netral-900 grid items-stretch divide-x-2 font-normal`}
    >
      {children}
    </div>
  );
}

function Column({ children, className = "" }) {
  const hasTextAlign = /text-(?:left|right|center)/.test(className);
  const alignment = hasTextAlign ? "" : "text-center";

  return (
    <div
      className={`flex min-w-0 items-center overflow-hidden px-3 py-2 break-words ${alignment} ${className}`}
    >
      {children}
    </div>
  );
}

function Footer() {
  return <div>Footer</div>;
}

Table.Header = Header;
Table.Row = Row;
Table.Body = Body;
Table.Column = Column;
Table.Footer = Footer;

export default Table;
