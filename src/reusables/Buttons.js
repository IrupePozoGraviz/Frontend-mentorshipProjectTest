/* import React from 'react'; */
import styled from '@emotion/styled';

export const PrimaryButton = styled.button`
color: rgb(255, 255, 255);
  text-transform: uppercase;
  font-size: 15px;
  background: linear-gradient(45deg, rgb(254, 48, 114), rgb(255, 89, 64));
  padding: 12px 30px;
  border-radius: 30px;
  border: none;

  :hover {
    background: linear - gradient(260deg, rgb(254, 48, 114), rgb(255, 89, 64));
}
    `
export const SecondaryButton = styled.button`
  color: rgb(121, 119, 119);
  background-color: rgb(255, 255, 255);
  font-weight: 500;
  font-size: 15px;
  text-transform: uppercase;
  padding: 12px 30px;
  border-radius: 30px;
  border: solid 2px rgb(121, 119, 119);
  margin: 6px;
    :hover {
         color: rgb(48, 48, 48);
  border: solid 2px rgb(48, 48, 48);

    }
    `

