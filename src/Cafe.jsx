function Cafe() {
    let cafeItems = [
        { 
            id: 1, 
            name: "Pizaa", 
            discription:"",
            price: 250,
            img: "pizza.webp"   // ⭐ ADD IMAGE HERE
        },
        { 
            id: 2, 
            name: "Burger", 
            price: 350,
            img: "burger.jpg" 
        },
        { 
            id: 3, 
            name: "Pasta", 
            price: 350,
            img: "pasta.jpeg" 
        },
        { 
            id: 4, 
            name: "French Fries", 
            price: 350,
            img: "fries.jpeg" 
        },
        { 
            id: 5, 
            name: "Maggie", 
            price: 350,
            img: "maggie.jpeg" 
        }
        
       
    ];

    return (
        <>
            <h1 styele={{ }}>This is Cafe section</h1>

            <div 
                style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "20px",
                    justifyContent: "center",
                    marginTop: "20px"
                }}
            >
                {cafeItems.map(item => (
                    <div 
                        key={item.id}
                        style={{
                            width: "280px",
                            border: "1px solid #ddd",
                            borderRadius: "12px",
                            padding: "12px",
                            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                            textAlign: "center",
                            fontFamily: "sans-serif"
                        }}
                    >
                        <img 
                            src={item.img}
                            alt={item.name}
                            style={{
                                width: "120px",
                                height: "120px",
                                borderRadius: "10px",
                                marginBottom: "10px",
                                objectFit: "cover"
                            }}
                        />

                        <h3 style={{ margin: "5px 0", fontSize: "18px" }}>
                            {item.name}
                        </h3>

                        <p style={{ margin: 0, fontSize: "16px", fontWeight: "bold" }}>
                            ₹{item.price}
                        </p>
                        <button className="btn btn bg-success">Add To cart</button>
                    </div>
                ))}
            </div>
        </>
    );
}

export default Cafe;


