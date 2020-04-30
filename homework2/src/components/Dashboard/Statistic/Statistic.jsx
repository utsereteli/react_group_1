import React from 'react';
import ReactCountryFlag from "react-country-flag";
import NumberFormat from 'react-number-format';
import axios from "axios";
import Modal from 'react-modal';

import './Statistic.scss';


const customStyles = {
    content : {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      height: '82vh'
    }
  };

Modal.setAppElement('#root')
const Statistic = ({ data, setSelect, pageSelect, search, filtered }) => {
    const [modalIsOpen,setIsOpen] = React.useState(false);
    const [modalData,setModalData] = React.useState([]);
    let countries = [];
    if (data.Countries) {
        countries = data.Countries;
    }

    function openModal( code ) {
        setIsOpen(true);
        axios
            .get(`https://api.covid19api.com/total/country/${code}`)
            .then((response) => {
                setModalData(response.data);
                
            })
            .catch(() => {
                console.error('Error');
            });
      }
     
      function afterOpenModal() {
        return true;
      }
     
      function closeModal(){
        setIsOpen(false);
        setModalData([]);
      }



    return (
        <>
            <div className="statistic">
                <div className="infected-country-wrapper">
                    <div className="head">
                        <h1>უახლესი სტატისტიკა</h1>
                            <div className='btn export' onClick={()=> window.open("https://api.covid19api.com/export", "_blank")}>EXPOT.RAR</div>

                        <div className="sort">
                            <input type="text" name='search' placeholder='ძებნა...' onInput={(event)=> search(event.target.value)}/>

                            <select name="page" onChange={(event) => setSelect(event.target.value)}>
                                <option value="25">25</option>
                                <option value="50">50</option>
                                <option value="75">75</option>
                                <option value="100">100</option>
                                <option value="200">200</option>
                            </select>

                        </div>
                    </div>

                    <table>
                        <thead>
                            <tr>
                                <th>ქვეყანა</th>
                                <th>სულ დაინფიცირებული</th>
                                <th>დღეს დაინფიცირებულა</th>
                                <th>დღეს გარდაიცვალა</th>
                                <th>დღეს გამოჯანმრთელდა</th>
                                <th>სულ გარდაიცვლილი</th>
                                <th>სულ გამოჯანმრთელებული</th>
                                <th>ქმედება</th>
                            </tr>
                        </thead>
                    </table>

                    <div className="table-wrapper">
                        <table>
                            <tbody>
                                {countries.sort((a, b) => b.TotalConfirmed - a.TotalConfirmed)
                                    .filter(e => e.Country.toLowerCase().includes(filtered.toLowerCase()))
                                    .slice(0, pageSelect)
                                    .map((data, i) =>
                                        <tr key={i}>
                                            <td>
                                                <div className="country">
                                                    <ReactCountryFlag countryCode={data.CountryCode} svg style={{
                                                        width: '1.5rem',
                                                        height: '1.5rem',
                                                        marginRight: '0.5rem'
                                                    }}
                                                        title={data.Country} />
                                                    {data.Country}
                                                </div>
                                            </td>
                                            <td>
                                                <NumberFormat
                                                    value={data.TotalConfirmed}
                                                    thousandSeparator={true}
                                                    displayType={'text'}
                                                />
                                            </td>
                                            <td>
                                                <NumberFormat
                                                    value={data.NewConfirmed}
                                                    thousandSeparator={true}
                                                    displayType={'text'}
                                                />
                                            </td>
                                            <td>
                                                <span className='red'>+
                                                    <NumberFormat
                                                        value={data.NewDeaths}
                                                        thousandSeparator={true}
                                                        displayType={'text'}
                                                    />
                                                </span>
                                            </td>
                                            <td>
                                                <span className='green'>-
                                            
                                                <NumberFormat
                                                    value={data.NewRecovered}
                                                    thousandSeparator={true}
                                                    displayType={'text'}
                                                />    
                                                </span>
                                            </td>
                                            <td>
                                                <NumberFormat
                                                    value={data.TotalDeaths}
                                                    thousandSeparator={true}
                                                    displayType={'text'}
                                                /></td>
                                            <td>
                                                <NumberFormat
                                                    value={data.TotalRecovered}
                                                    thousandSeparator={true}
                                                    displayType={'text'}
                                                />
                                            </td>
                                            <td><div className='btn' onClick={()=>openModal(data.CountryCode)}>ნახვა</div></td>
                                        </tr>
                                    )
                                }

                            </tbody>
                        </table>
                    </div>
                </div>
                {/* <div className="map">
                <iframe src="https://ourworldindata.org/grapher/total-cases-covid-19?tab=map"frameBorder="0" height='100%' width="100%"></iframe>
                </div> */}
                
                <Modal
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
                >
                <span className='close' onClick={closeModal}></span>
                <table>
                    <thead>
                        <tr>
                            <th>ქვეყანა</th>
                            <th>დაიმფიცირებული</th>
                            <th>გარდაცვლილი</th>
                            <th>გამოჯანმრთელებულ</th>
                            <th>თარიღი</th>
                        </tr>
                    </thead>
                </table>

                <div className="table-wrapper">
                <table>
                    <tbody>
                    {
                        modalData.sort((a, b) => b.Confirmed - a.Confirmed).map((data, i) =>
                        <tr key={i}>
                        <td>
                            {data.Country}
                        </td>
                        <td>
                            <NumberFormat
                                value={data.Confirmed}
                                thousandSeparator={true}
                                displayType={'text'}
                            />
                        </td>
                        <td>
                            <span className="red">
                            <NumberFormat
                                value={data.Deaths}
                                thousandSeparator={true}
                                displayType={'text'}
                            />
                            </span>
                        </td>
                        <td>
                            <span className='green'>
                                <NumberFormat
                                    value={data.Recovered}
                                    thousandSeparator={true}
                                    displayType={'text'}
                                />
                            </span>
                        </td>
                        <td>{data.Date.split('T')[0]}</td>
                    </tr>
                        )
                    }
                    </tbody>
                </table>
                </div>
                </Modal>
            </div>
        </>
    )
};

export default Statistic;