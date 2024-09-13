import React from 'react';

function Home({isLoggedIn}) {
    return (
        <div  style={{textAlign:"center"}}>
           <h1>Welcome to Product Store</h1>
           <h3>Is Logged in: {String(isLoggedIn)}</h3> 
        </div>
    );
}

export default Home;