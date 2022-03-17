import React, { useEffect, useState } from 'react'
import roundIcon from "./images/round.svg"
import crossIcon from "./images/cross.svg"


const GameBoard = (props) => {


    const [state, setState] = useState({
        is_loading: false,
        user: props?.data?.user,
        room_id: props?.data?.room?.room_id,
        user1: props?.data?.room?.user1,
        user2: props?.data?.room?.user2,
        list: [...props?.data?.room?.list],
        selected_user: props?.data?.room?.selected_user,
        last_selected_user: props?.data?.room?.last_selected_user,
    })


    // const handleCalculate = (list, user) => {
    //     // console.log({ user });
    //     /**
    //      *   0 1 2
    //      *   3 4 5
    //      *   6 7 8 
    //      */

    //     const is_full = list?.filter(d => d?.is_selected)?.length === list?.length

    //     if (is_full) {
    //         return true
    //     }


    //     ///////////////////////////////////////////////////////////
    //     // 0-1-2
    //     if (
    //         list?.[0]?.is_selected && list?.[0]?.selected_by == user &&
    //         list?.[1]?.is_selected && list?.[1]?.selected_by == user &&
    //         list?.[2]?.is_selected && list?.[2]?.selected_by == user
    //     ) {
    //         // console.log("winer", user);
    //         return user
    //     }

    //     // 3-4-5
    //     else if (
    //         list?.[3]?.is_selected && list?.[3]?.selected_by == user &&
    //         list?.[4]?.is_selected && list?.[4]?.selected_by == user &&
    //         list?.[5]?.is_selected && list?.[5]?.selected_by == user
    //     ) {
    //         // console.log("winer", user);
    //         return user
    //     }

    //     // 6-7-8
    //     else if (
    //         list?.[6]?.is_selected && list?.[6]?.selected_by == user &&
    //         list?.[7]?.is_selected && list?.[7]?.selected_by == user &&
    //         list?.[8]?.is_selected && list?.[8]?.selected_by == user
    //     ) {
    //         // console.log("winer", user);
    //         return user
    //     }

    //     /**
    //      * 0
    //      * 3
    //      * 6
    //      */
    //     else if (
    //         list?.[0]?.is_selected && list?.[0]?.selected_by == user &&
    //         list?.[3]?.is_selected && list?.[3]?.selected_by == user &&
    //         list?.[6]?.is_selected && list?.[6]?.selected_by == user
    //     ) {
    //         // console.log("winer", user);
    //         return user
    //     }

    //     /**
    //      * 1
    //      * 4
    //      * 7
    //      */
    //     else if (
    //         list?.[1]?.is_selected && list?.[1]?.selected_by == user &&
    //         list?.[4]?.is_selected && list?.[4]?.selected_by == user &&
    //         list?.[7]?.is_selected && list?.[7]?.selected_by == user
    //     ) {
    //         // console.log("winer", user);
    //         return user
    //     }

    //     /**
    //      * 2
    //      * 5
    //      * 8
    //      */
    //     else if (
    //         list?.[2]?.is_selected && list?.[2]?.selected_by == user &&
    //         list?.[5]?.is_selected && list?.[5]?.selected_by == user &&
    //         list?.[8]?.is_selected && list?.[8]?.selected_by == user
    //     ) {
    //         // console.log("winer", user);
    //         return user
    //     }





    //     /**
    //     * 0
    //     *   4
    //     *     8
    //     */
    //     else if (
    //         list?.[0]?.is_selected && list?.[0]?.selected_by == user &&
    //         list?.[4]?.is_selected && list?.[4]?.selected_by == user &&
    //         list?.[8]?.is_selected && list?.[8]?.selected_by == user
    //     ) {
    //         // console.log("winer", user);
    //         return user
    //     }

    //     /**
    //      *    2
    //      *  4
    //      * 6
    //      */
    //     else if (
    //         list?.[1]?.is_selected && list?.[1]?.selected_by == user &&
    //         list?.[4]?.is_selected && list?.[4]?.selected_by == user &&
    //         list?.[7]?.is_selected && list?.[7]?.selected_by == user
    //     ) {
    //         // console.log("winer", user);
    //         return user
    //     }


    //     return false


    // }


    const handleClick = (arg) => {
        if (!state?.user1?.id || !state?.user2?.id) return alert("Another user is not joined yet!")
        if (state?.user !== state?.selected_user) return alert("This is not your tern. Wait till your oponent.")
        props?.socket?.emit("move-click", { room_id: state?.room_id, move_info: arg }, response => {
            if (response) {
                setState({
                    ...state,
                    selected_user: response?.room?.selected_user,
                    last_selected_user: response?.room?.last_selected_user,
                    list: response?.room?.list,
                })
            }
        })

    }

    const handleReset = () => {
        // setState({ ...state, is_loading: false, list: [...init_list], selected_user: state?.user_list?.user1?.selector, last_selected_user: null })
    }

    useEffect(() => {

        props?.socket?.on("someone-joined", (response) => {
            console.log("Another user: ", response);
            alert("Another one joined")
            setState({
                ...state,
                selected_user: response?.selected_user,
                last_selected_user: response?.last_selected_user,
                list: response?.list,
                user2: response?.user2

            })
        })

        if (!state?.selected_user) {
            // handleReset()
        }

    }, [])


    useEffect(() => {

        props?.socket?.on("result", (winer) => {
            // const winer = handleCalculate(state?.list, state?.last_selected_user)
            console.log({ winer });
            // setTimeout(() => {
            if (winer === true) {
                alert("Match draw! Play again")
                return handleReset()
            }
            if (winer) {
                alert("WINER IS: " + winer)
                return handleReset()
            }
            // }, 200);
        })


        // move-click-update
        props?.socket?.on("move-click-update", (response) => {
            console.log("update-click ", response);
            if (response) {
                setState({
                    ...state,
                    selected_user: response?.room?.selected_user,
                    last_selected_user: response?.room?.last_selected_user,
                    list: response?.room?.list,
                    user2: response?.room?.user2
                })
            }
        })


        // reset
        props?.socket?.on("reset-list", (response) => {
            console.log("reset ", response);
            if (response) {
                setState({
                    ...state,
                    list: response
                })
            }
        })



    }, [])







    return (
        <div >
            {/* --------- board header -------- */}
            <div className="row my-3">
                <div className="col-lg-6 col-md-8 m-auto">
                    <div className="card card-body p-2" >
                        <div className="pb-2 text-center">
                            ROOM ID: {state?.room_id}
                        </div>
                        {/* -------------------------- */}
                        <div className="d-flex justify-content-between align-items-center">
                            <div>

                                {/* <div className={"user_selected"} >
                                    <div
                                        style={{
                                            textAlign: "center",
                                            fontWeight: "bold",
                                            color: "green"
                                        }}
                                    >
                                        You
                                    </div>
                                    <b>  MY NAME</b>
                                    <div> Icon: <img src={roundIcon} alt="SVG" height="100%" /> </div>
                                </div> */}

                                {
                                    state?.user == state?.user1?.id ?
                                        <div className={state?.selected_user == state?.user1?.id ? "user_selected" : ""} >
                                            <div
                                                style={{
                                                    textAlign: "center",
                                                    fontWeight: "bold",
                                                    color: "green"
                                                }}
                                            >
                                                You
                                            </div>
                                            <b> {state?.user1?.name} </b>
                                            <div> Icon: <img src={roundIcon} alt="SVG" height="100%" /> </div>
                                        </div>
                                        :
                                        <div className={state?.selected_user == state?.user2?.id ? "user_selected" : ""} >
                                            <div
                                                style={{
                                                    textAlign: "center",
                                                    fontWeight: "bold",
                                                    color: "green"
                                                }}
                                            >
                                                You
                                            </div>
                                            <b> {state?.user2?.name} </b>
                                            <div> Icon: <img src={crossIcon} alt="SVG" height="100%" /> </div>
                                        </div>

                                }

                            </div>
                            <div>
                                {
                                    state?.user == state?.user1?.id ?
                                        <div className={state?.selected_user == state?.user2?.id ? "user_selected" : ""} >
                                             <div
                                                style={{
                                                    textAlign: "center",
                                                    fontWeight: "bold",
                                                    color: "red"
                                                }}
                                            >
                                                Oponent
                                            </div>
                                             <b> {state?.user2?.name} </b>
                                            <div> Icon: <img src={crossIcon} alt="SVG" height="100%" /> </div>
                                        </div>
                                        :
                                        <div className={state?.selected_user == state?.user1?.id ? "user_selected" : ""} >
                                              <div
                                                style={{
                                                    textAlign: "center",
                                                    fontWeight: "bold",
                                                    color: "red"
                                                }}
                                            >
                                                Oponent
                                            </div>
                                             <b> {state?.user1?.name} </b>
                                            <div> Icon: <img src={roundIcon} alt="SVG" height="100%" /> </div>
                                        </div>

                                }
                            </div>
                        </div>
                        {/* -------------------------- */}
                    </div>
                </div>
            </div>

            {/* ------------- board ------------ */}
            <div className="row my-3">
                <div className="col-lg-6 col-md-8 m-auto">
                    {/* <div className="card card-body p-0 py-3"  > */}
                    <div className="p-0 py-3"  >

                        <div className="board">
                            {
                                state?.list?.map?.((item, index) => {
                                    return <div key={index} className="item" onClick={() => !item?.is_selected ? handleClick(item) : null} >
                                        {
                                            item?.is_selected &&
                                            <img src={item?.selected_by == state?.user1.id ? roundIcon : crossIcon} alt="SVG" height="100%" />
                                        }
                                    </div>
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>

            {/* <div className="row my-3">
                <div className="col-lg-6 col-md-8 m-auto">
                    <button className='btn' onClick={handleReset} >Clear</button>
                </div>
            </div> */}

            {/* --------------------------------- */}
        </div>
    )
}

export default GameBoard