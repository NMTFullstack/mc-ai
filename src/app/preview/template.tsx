import HeaderPreview from "./component/header";

export default function Template({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <HeaderPreview />
            <div className="mt-80">{children}</div>
        </div>
    );
}
