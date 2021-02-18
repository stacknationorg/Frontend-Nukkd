import React from 'react'

function Title({title}) {
    React.useEffect(() => {
        document.title = title
    }, [title]);
    return <></>;
}

export default Title
