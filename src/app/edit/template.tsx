import HeaderEdit from "./component/header";

export default function Template({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <HeaderEdit />
            <div className="mt-80">{children}</div>
        </div>
    );
}
