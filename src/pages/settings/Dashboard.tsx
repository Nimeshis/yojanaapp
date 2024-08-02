import { ContentHeader } from '@components';

const Dashboard = () => {
  return (
    <div>
      <ContentHeader title="समिति गठन" />

      <section className="content">
        <div className="container-fluid">
          <div className="row">
            
            
            <div className="col-lg-3 col-6">
            <div className="small-box bg-teal">
            <div className="inner">
                  <h3>१ </h3>

                  <p>टोल विकास समिति</p>
                </div>
                <div className="icon">
                  <i className="ion ion-person" />
                </div>
                <a href="/" className="small-box-footer">
                  विस्त्रित विवरण <i className="fas fa-arrow-circle-right" />
                </a>
              </div>
            </div>
            <div className="col-lg-3 col-6">
            <div className="small-box bg-teal">
            <div className="inner">
                  <h3>२ </h3>

                  <p>अनुगमन समिति </p>
                </div>
                <div className="icon">
                  <i className="ion ion-person" />
                </div>
                <a href="/" className="small-box-footer">
                विस्त्रित विवरण <i className="fas fa-arrow-circle-right" />
                </a>
              </div>
            </div>
           
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
