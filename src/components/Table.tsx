function Table({
  children,
  title,
}: {
  children: React.ReactNode;
  title?: string;
}) {
  return (
    <div className="px-4 sm:px-6 lg:px-8 max-w-3xl w-full">
      <div className="mt-2 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            {title && (
              <div className="self-start text-3xl font-medium pb-4">
                {title}
              </div>
            )}
            <div className="overflow-hidden shadow ring-4 ring-white ring-opacity-25 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300 text">
                {children}
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function THead({ data }: { data: string[] }) {
  const firstCol = (
    <th
      scope="col"
      className="py-3.5 pl-4 pr-3 text-left text-base font-semibold text-zinc-100 sm:pl-6"
    >
      {data[0]}
    </th>
  );

  const newData = [...data];
  newData.shift();
  const midCols = newData.map((name, idx) => {
    return (
      <th
        key={idx}
        scope="col"
        className="px-3 py-3.5 text-left text-base font-semibold text-zinc-100"
      >
        {name.toUpperCase() === "EDIT" ? "" : name}
      </th>
    );
  });

  return (
    <thead className="bg-zinc-700">
      <tr>
        {firstCol}
        {midCols}
      </tr>
    </thead>
  );
}

function TBody({ children }: { children: React.ReactNode }) {
  return (
    <tbody className="divide-y divide-gray-200 bg-white">{children}</tbody>
  );
}

function Tr({ children }: { children: React.ReactNode }) {
  return <tr>{children}</tr>;
}

function Td({
  children,
  type,
  id,
}: {
  children: React.ReactNode;
  type?: "first" | "edit" | "last" | "default";
  id?: string;
}) {
  if (type === "first") {
    return (
      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
        {children}
      </td>
    );
  }

  if (type === "last") {
    return (
      <td className="whitespace-nowrap py-4 pr-4 pl-3 text-sm font-medium text-gray-900 sm:pr-6">
        {children}
      </td>
    );
  }

  return (
    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
      {children}
    </td>
  );
}

export { Table, TBody, THead, Tr, Td };
