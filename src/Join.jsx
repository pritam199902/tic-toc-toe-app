import React, { useState } from 'react'

const Join = (props) => {

    const [state, setState] = useState({
        is_create_show: true,
        name: "",
        room_id: ""
    })





    return (
        <div>
            <div className="row my-2">
                <div className="col-lg-6 col-md-8 m-auto">
                    <button className={`btn ${ !state?.is_create_show ? "btn-dark" : ""} m-2 `} onClick={() => setState({ ...state, is_create_show: true })}  >
                        Create Room
                    </button>
                    <button className={`btn ${state?.is_create_show ? "btn-dark" : ""} m-2 `} onClick={() => setState({ ...state, is_create_show: false })}  >
                        Join Room
                    </button>
                </div>
            </div>

            {
                state?.is_create_show ?

                    <div className="row my-3">
                        <div className="col-lg-6 col-md-8 m-auto">
                            <div className="card card-body p-2" >
                                <div>
                                    <h5>
                                        Create New Room
                                    </h5>
                                </div>
                                <hr className="my-1" />
                                <div className='m-2' >
                                    <input type="text" className='form-control' placeholder='Your name...' value={state?.name} onChange={(e) => setState({ ...state, name: e.target.value })} />
                                </div>
                                <div className='m-auto mt-3' >
                                    <button className="btn btn-dark" onClick={() => state?.name ? props?.createRoom?.({ name: state?.name }) : alert("Enter your name")} >Create</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    :
                    <div className="row my-3">
                        <div className="col-lg-6 col-md-8 m-auto">
                            <div className="card card-body p-2" >
                                <div>
                                    <h5>
                                        Join Room
                                    </h5>
                                </div>
                                <hr className="my-1" />
                                <div className='m-2' >
                                    <input type="text" className='form-control my-1' placeholder='Room ID...' value={state?.room_id} onChange={(e) => setState({ ...state, room_id: e.target.value })} />
                                    <input type="text" className='form-control my-1' placeholder='Your name...' value={state?.name} onChange={(e) => setState({ ...state, name: e.target.value })} />

                                </div>
                                <div className='m-auto mt-3' >
                                    <button className="btn btn-dark" onClick={() => state?.room_id ? props?.joinRoom?.({ name: state?.name, room_id: state?.room_id }) : alert("Enter your Room ID")} >Join</button>
                                </div>
                            </div>
                        </div>
                    </div>
            }

        </div>
    )
}

export default Join