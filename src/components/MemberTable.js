import React from "react";
import "../App.css";

const MemberTable = ({ filteredMembers }) => {
  return (
    <table className="member-table">
      <thead>
        <tr>
          <th>번호</th>
          <th>대수</th>
          <th>의원명</th>
          <th>정당</th>
          <th>소속위원회</th>
          <th>지역</th>
          <th>성별</th>
          <th>당선 횟수</th>
          <th>당선 방법</th>
        </tr>
      </thead>
      <tbody>
        {filteredMembers.length > 0 ? (
          filteredMembers.map((member, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{member.UNITS}</td>
              <td>{member.HG_NM}</td>
              <td>{member.POLY_NM}</td>
              <td>{member.CMITS}</td>
              <td>{member.ORIG_NM}</td>
              <td>{member.SEX_GBN_NM}</td>
              <td>{member.REELE_GBN_NM}</td>
              <td>{member.ELECT_GBN_NM}</td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="9">조건에 해당하는 국회의원이 없습니다.</td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default MemberTable;
