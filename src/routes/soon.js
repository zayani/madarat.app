import { Link } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import { TopBar, Icon } from "../lib";


export default function () {
     return (
          <div>

               <TopBar name="قريبًا" />
               <div underdev="">
                    قطة مدارات مشغولة بتطوير هذا التطبيق المصغر
                    <br />
                    <br />
                    الرجاء العودة لاحقًا
               </div>
               <div underdevicon="">
                    <Icon name="cat-space" />
               </div>
          </div>
     );
}