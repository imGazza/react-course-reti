interface CountProps {
    children: React.ReactNode;
    count: number;
}

const ImChild: React.FC<CountProps> = ({count, children}) => {
    return (
        <>
            <p>{count}</p>
            {children}
        </>
    );
}

export default ImChild;