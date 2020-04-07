import React from "react";
import { Table } from "reactstrap";

function SimpleTable(props){
  const {dataHeader, dataParam, data, multiParam} = props;
  return(
    <>
      <Table striped bordered responsive hover size="sm">
        <thead className="text-center ">
          <tr>
            <td>#</td>
            { 
              dataHeader.map((header, i) => {
                return <td key={i}>{header}</td>
              })
            }
          </tr>
        </thead>
        <tbody>
          { (data.length > 0)
            ? data.map((dataTable, i) => {
                return (
                  <tr key={i}>
                    <td className="text-center">{i+1}</td>
                    {
                      dataHeader.map((_, indexHeader) => {
                        if(multiParam.status === true){
                          return (
                            <td key={indexHeader}>
                              {dataTable[multiParam.param][dataParam[indexHeader]]}
                            </td>
                          )
                        }
                        return <td key={indexHeader}>{dataTable[dataParam[indexHeader]]}</td>
                      })
                    }
                  </tr>
                )
              }
            )
            : <tr className="text-center ">
                <td colSpan={dataHeader.length + 1}>Data tidak ditemukan.</td>
              </tr>
          }
        </tbody>
      </Table>
    </>
  )
}

export default SimpleTable