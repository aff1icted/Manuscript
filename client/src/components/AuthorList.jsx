
const AuthorList = ({ authors }) => {


    let buf = []
    authors?.map(author => buf.push(author.fullname))

    if (!authors?.length) {
        return (
            <h1 style={{ textAlign: "center" }}></h1>
        )
    }
    return (
        <div>
            {
                buf.toString()
            }
        </div>

    )


};

export default AuthorList;