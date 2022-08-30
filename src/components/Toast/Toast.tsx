import './Toast.scss';

const Toast = () => {
    return (
            <section>
                <div className="square_box box_three"></div>
                <div className="square_box box_four"></div>
                <div className="container mt-5">
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="alert fade alert-simple alert-success alert-dismissible text-left font__family-montserrat font__size-16 font__weight-light brk-library-rendered rendered show">
                                <button type="button" className="close font__size-18" data-dismiss="alert">
                                    <span aria-hidden="true">
                                        <p>
                                            <i className="fa fa-times greencross"></i>
                                        </p>
                                    </span>
                                    <span className="sr-only">Close</span>
                                </button>
                                <i className="start-icon far fa-check-circle faa-tada animated"></i>
                                <strong className="font__weight-semibold">Well done!</strong> You successfullyread this
                                important.
                            </div>
                        </div>

                        <div className="col-sm-12">
                            <div
                                className="alert fade alert-simple alert-info alert-dismissible text-left font__family-montserrat font__size-16 font__weight-light brk-library-rendered rendered show"
                                role="alert"
                                data-brk-library="component__alert"
                            >
                                <button type="button" className="close font__size-18" data-dismiss="alert">
                                    <span aria-hidden="true">
                                        <i className="fa fa-times blue-cross"></i>
                                    </span>
                                    <span className="sr-only">Close</span>
                                </button>
                                <i className="start-icon  fa fa-info-circle faa-shake animated"></i>
                                <strong className="font__weight-semibold">Heads up!</strong> This alert needs your
                                attention, but it's not super important.
                            </div>
                        </div>

                        <div className="col-sm-12">
                            <div
                                className="alert fade alert-simple alert-warning alert-dismissible text-left font__family-montserrat font__size-16 font__weight-light brk-library-rendered rendered show"
                                role="alert"
                                data-brk-library="component__alert"
                            >
                                <button type="button" className="close font__size-18" data-dismiss="alert">
                                    <span aria-hidden="true">
                                        <i className="fa fa-times warning"></i>
                                    </span>
                                    <span className="sr-only">Close</span>
                                </button>
                                <i className="start-icon fa fa-exclamation-triangle faa-flash animated"></i>
                                <strong className="font__weight-semibold">Warning!</strong> Better check yourself, you're
                                not looking too good.
                            </div>
                        </div>

                        <div className="col-sm-12">
                            <div
                                className="alert fade alert-simple alert-danger alert-dismissible text-left font__family-montserrat font__size-16 font__weight-light brk-library-rendered rendered show"
                                role="alert"
                                data-brk-library="component__alert"
                            >
                                <button type="button" className="close font__size-18" data-dismiss="alert">
                                    <span aria-hidden="true">
                                        <i className="fa fa-times danger "></i>
                                    </span>
                                    <span className="sr-only">Close</span>
                                </button>
                                <i className="start-icon far fa-times-circle faa-pulse animated"></i>
                                <strong className="font__weight-semibold">Oh snap!</strong> Change a few things up and try
                                submitting again.
                            </div>
                        </div>

                        <div className="col-sm-12">
                            <div
                                className="alert fade alert-simple alert-primary alert-dismissible text-left font__family-montserrat font__size-16 font__weight-light brk-library-rendered rendered show"
                                role="alert"
                                data-brk-library="component__alert"
                            >
                                <button type="button" className="close font__size-18" data-dismiss="alert">
                                    <span aria-hidden="true">
                                        <i className="fa fa-times alertprimary"></i>
                                    </span>
                                    <span className="sr-only">Close</span>
                                </button>
                                <i className="start-icon fa fa-thumbs-up faa-bounce animated"></i>
                                <strong className="font__weight-semibold">Well done!</strong> You successfullyread this
                                important.
                            </div>
                        </div>
                    </div>
                </div>
            </section>
  
    );
};

export default Toast;
