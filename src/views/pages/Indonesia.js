import React from "react";
import classnames from "classnames";
// reactstrap components
import {
  Button,
  Card,
  Container,
  Row,
  Col,
  NavItem,
  NavLink,
  Nav,
  TabContent,
  TabPane,
  FormGroup,
  Label,
  Input } from "reactstrap";

// core components
// import NavbarDefault from "components/Navbars/NavbarDefault.js";
import SimpleTable from "components/Table/SimpleTable.js";
import FooterDefault from "components/Footers/FooterDefault.js";
import SpinnerDefault from "components/Spinner/SpinnerDefault";

class Profile extends React.Component {
  constructor(props){
    super(props);
    this.urlDataStatus= 'https://api.kawalcorona.com/indonesia/'
    this.urlDataProvinsi = 'https://api.kawalcorona.com/indonesia/provinsi/'
    this.urlListProvinsi = 'https://covid19-api-id.herokuapp.com/provinsi/'

    this.provinsiMultiParam = {
      status: true,
      'param': "attributes"
    }
    this.dataProvinsiHeader= ['Provinsi', 'Positif', 'Sembuh', 'Meninggal'];
    this.dataProvinsiParam= ['Provinsi', 'Kasus_Posi', 'Kasus_Semb', 'Kasus_Meni'];

    this.kabupatenMultiParam = {
      'status': false
    }
    this.dataKabupatenHeader= ['Kota/Kabupaten', 'ODP', 'PDP', 'Positif'];
    this.dataKabupatenParam= ['kabupaten', 'ODP', 'PDP', 'positif'];

    this.state = {
      error: null,
      plainTabs: 1,
      loadingProvinsi: false,
      loadingKabupaten: false,
      dataStatus: [],
      dataProvinsi: [],
      dataKabupaten: [],
      listProvinsi: []
    }
  }
  toggleNavs = (e, state, index) => {
    e.preventDefault();
    this.setState({
      [state]: index
    });
  };
  removeComma(value){
    if(typeof value == 'undefined'){
      return 0
    }
    return value.replace(',', '')
  }
  getDataStatus(){
    fetch(this.urlDataStatus)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            dataStatus: result[0]
          });
        },
        (error) => {
          this.setState({
            error
          });
        }
      )
  }
  getDataProvinsi(){
    this.setState({
      loadingProvinsi: true
    })
    fetch(this.urlDataProvinsi)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            dataProvinsi: result,
            loadingProvinsi: false
          });
        },
        (error) => {
          this.setState({
            loadingProvinsi: false,
            error
          });
        }
      )
  }
  getListProvinsi(){
    fetch(this.urlListProvinsi)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            listProvinsi: result.data
          });
        },
        (error) => {
          this.setState({
            error
          });
        }
      )
  }
  getDataKabupaten(urlDataKabupaten){
    this.setState({
      loadingKabupaten: true
    })
    fetch(urlDataKabupaten)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            dataKabupaten: result.data,
            loadingKabupaten: false,
          });
        },
        (error) => {
          this.setState({
            dataKabupaten: [],
            loadingKabupaten: false,
            error
          });
        }
      )
  }
  changeProvinsiSelect(e){
    let urlDataKabupaten = e.target.value;
    this.getDataKabupaten(urlDataKabupaten);
  }
  componentDidMount() {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    this.refs.main.scrollTop = 0;
    this.getDataStatus();
    this.getDataProvinsi();
    this.getListProvinsi();
  }
  render() {
    const { dataStatus, dataProvinsi, listProvinsi, dataKabupaten } = this.state;
    const {loadingProvinsi} = this.state;
    return (
      <>
        {/* <NavbarDefault /> */}
        <main className="profile-page" ref="main">
          <section className="section-profile-cover section-shaped my-0">
            {/* Circles background */}
            <div className="shape shape-style-1 shape-default alpha-4">
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
            </div>
            {/* SVG separator */}
            <div className="separator separator-bottom separator-skew">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
                version="1.1"
                viewBox="0 0 2560 100"
                x="0"
                y="0">
                <polygon
                  className="fill-white"
                  points="2560 0 2560 100 0 100"
                />
              </svg>
            </div>
          </section>
          <section className="section">
            <Container>
              <Card className="card-profile shadow mt--300">
                <div className="px-4">
                  <Row className="justify-content-center">
                    <Col className="order-lg-2" lg="3">
                      <div className="card-profile-image">
                        <a href="#pablo" onClick={e => e.preventDefault()}>
                          <img
                            alt="..."
                            className="rounded-circle"
                            src={require("assets/custom/img/covid19.jpeg")}
                          />
                        </a>
                      </div>
                    </Col>
                    <Col
                      className="order-lg-3 text-lg-right align-self-lg-center"
                      lg="4">
                      <div className="card-profile-actions py-4 mt-lg-0">
                        <Button
                          className="mr-4"
                          color="success"
                          onClick={e => e.preventDefault()}
                          size="sm">
                          { ((this.removeComma(dataStatus.sembuh) / this.removeComma(dataStatus.positif)) * 100).toFixed(2) }%
                          <br/>Sembuh
                        </Button>
                        <Button
                          className="float-right"
                          color="danger"
                          onClick={e => e.preventDefault()}
                          size="sm">
                          { ((this.removeComma(dataStatus.meninggal) / this.removeComma(dataStatus.positif)) * 100).toFixed(2) }%
                          <br/>Meninggal
                        </Button>
                      </div>
                    </Col>
                    <Col className="order-lg-1" lg="4">
                      <div className="card-profile-stats d-flex justify-content-center">
                        <div>
                          <span className="heading">{ dataStatus.positif }</span>
                          <span className="description">Positif</span>
                        </div>
                        <div>
                          <span className="heading">{ dataStatus.sembuh }</span>
                          <span className="description">Sembuh</span>
                        </div>
                        <div>
                          <span className="heading">{ dataStatus.meninggal }</span>
                          <span className="description">Meninggal</span>
                        </div>
                      </div>
                    </Col>
                  </Row>
                  <div className="mt-5">
                    <div className="nav-wrapper">
                      <Nav
                        className="nav-fill flex-column flex-md-row"
                        id="tabs-icons-text"
                        pills
                        role="tablist">
                        <NavItem>
                          <NavLink
                            aria-selected={this.state.plainTabs === 1}
                            className={classnames("mb-sm-3 mb-md-0", {
                              active: this.state.plainTabs === 1
                            })}
                            onClick={e => this.toggleNavs(e, "plainTabs", 1)}
                            href="#provinsi"
                            role="tab">
                            Provinsi
                          </NavLink>
                        </NavItem>
                        <NavItem>
                          <NavLink
                            aria-selected={this.state.plainTabs === 2}
                            className={classnames("mb-sm-3 mb-md-0", {
                              active: this.state.plainTabs === 2
                            })}
                            onClick={e => this.toggleNavs(e, "plainTabs", 2)}
                            href="#kota"
                            role="tab">
                            Kota/Kabupaten
                          </NavLink>
                        </NavItem>
                      </Nav>
                  </div>
                  <TabContent activeTab={"plainTabs" + this.state.plainTabs}>
                    <TabPane tabId="plainTabs1">
                      { (loadingProvinsi)
                          ? <SpinnerDefault/>
                          : <SimpleTable
                              multiParam={this.provinsiMultiParam}
                              dataHeader={this.dataProvinsiHeader}
                              dataParam={this.dataProvinsiParam}
                              data={dataProvinsi}/>
                      }

                    </TabPane>
                    <TabPane tabId="plainTabs2">
                      <FormGroup>
                        <Label className="font-weight-bold">Provinsi</Label>
                        <Input type="select" name="provinsi" defaultValue="" onChange={(e) => this.changeProvinsiSelect(e)}>
                            <option value="" disabled>Pilih Provinsi</option>
                            {
                              listProvinsi.map((provinsi, i) => {
                                return (
                                  <option key={i} value={provinsi.url}>
                                    {provinsi.namaProvinsi}
                                  </option>
                                )
                              })
                            }
                        </Input>
                      </FormGroup>
                      { (this.state.loadingKabupaten)
                          ? <div className="text-center">
                              <SpinnerDefault/>
                            </div>
                          : <SimpleTable
                              multiParam={this.kabupatenMultiParam}
                              dataHeader={this.dataKabupatenHeader}
                              dataParam={this.dataKabupatenParam}
                              data={dataKabupaten}/>
                      }
                    </TabPane>
                  </TabContent>
                  </div>
                </div>
              </Card>
            </Container>
          </section>
        </main>
        <FooterDefault />
      </>
    );
  }
}

export default Profile;
