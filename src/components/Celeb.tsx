function Celeb(props: { daysOld: number | null; }) {
    const daysOld = props.daysOld
    return (<>
            <p>You are {daysOld} days old!</p>
            <p>
                Info about some celeb here
            </p>
        </>
    );
};

export default Celeb;
