import './Page.css';

function Page({children}) {

    return (
        <div className="page main">
            {children}
        </div>
    )
}

export default Page