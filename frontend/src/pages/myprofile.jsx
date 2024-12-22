import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./myprofile.css";

const MyProfile=()=>{
  const navigate=useNavigate();
  const [profile,setProfile]=useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    shopName: "My Shop",
    address: "",
    bankAccount: "XXXX XXXX 1234",
    ifsc: "SBIN0001234",
    totalSales: "₹7095",
    rating: "New Seller"
  });

  const[isEditing, setIsEditing]=useState(false);
  const[editedProfile, setEditedProfile]=useState(profile);
  const[loading, setLoading]=useState(true);

  useEffect(() => {
    const fetchUserProfile=async()=>{
      try{
        const user=auth.currentUser;
        if(!user){
          navigate('/login');
          return;
        }

        const userDoc=await getDoc(doc(db, "Users", user.uid));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setProfile(prevProfile=>({
            ...prevProfile,
            firstName: userData.firstName || "",
            lastName: userData.lastName || "",
            email: userData.email || "",
            phone: userData.phone || "",
            shopName: userData.shopName || "My Shop",
            address: userData.address || "",
          }));
        }
      } catch(error){
        console.error("Error fetching profile:",error);
      } finally{
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [navigate]);

  const handleEdit=()=>{
    setIsEditing(true);
    setEditedProfile(profile);
  };

  const handleSave=async()=>{
    try{
      const user=auth.currentUser;
      if(user){
        await updateDoc(doc(db, "Users", user.uid), {
          firstName: editedProfile.firstName,
          lastName: editedProfile.lastName,
          phone: editedProfile.phone,
          shopName: editedProfile.shopName,
          address: editedProfile.address,
        });
        setProfile(editedProfile);
        setIsEditing(false);
      }
    } catch(error){
      console.error("Error updating profile:", error);
    }
  };

  const handleChange=(e)=>{
    const{name,value}=e.target;
    setEditedProfile(prev=>({
      ...prev,
      [name]:value
    }));
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="dashboard-container">
      <div className="sidebar">
        <div className="logo">
          <img
            src="https://i.pinimg.com/736x/8b/16/7a/8b167af653c2399dd93b952a48740620.jpg"
            alt="Logo"
          />
        </div>
        <nav className="sidebar-menu">
          <a href="/dashboardhome" className="menu-item">Dashboard</a>
          <a href="/order" className="menu-item">Orders</a>
          <a href="/return" className="menu-item">Returns</a>
          <a href="/inventory" className="menu-item">Inventory</a>
          <a href="/payment" className="menu-item">Payments</a>
          <a href="/ai" className="menu-item">AI Assistant</a>
          <a href="/learn" className="menu-item">Learn</a>
          <br />
          <br />
          <br />
          <br />
          <br />
          <a href="/myprofile" className="menu-item">MyProfile</a>
          <a href="#" className="menu-item">Support</a>
        </nav>
      </div>

      <div className="main-content">
        <div className="profile-container">
          <div className="profile-header">
            <div className="profile-cover"></div>
            <div className="profile-info">
              <div className="profile-avatar">
                <img src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxITEhUSEhIWFRUVFhYVFRUVGBUVFRUXFRUWFhUVFRUYHSggGBolHhUVITEhJSkrLi4uFx8zODMtNygtLisBCgoKDg0OGhAQGy0lICUvLS0tLS0tLS0tLS0tLSstLS0tLS0tLS0tLS0tLy8tLS0tLS0tLS0tLS0tLS0tLS0tLf/AABEIALcBEwMBEQACEQEDEQH/xAAcAAABBQEBAQAAAAAAAAAAAAAFAQIDBAYHAAj/xABIEAACAQIEAwUFBQQIBAUFAAABAgMAEQQFEiEGMVETIkFhcQcygZGhFFKxwdEjM0JyFRZTYoKS4fBDVKLCCDTD0vEXhJOjs//EABoBAAIDAQEAAAAAAAAAAAAAAAECAAMEBQb/xAA7EQACAQIEAwUHAwMEAQUAAAAAAQIDEQQSITETQVEFImFxoRQygZGxwdEj4fAzQlIkYrLxFUNEgpKi/9oADAMBAAIRAxEAPwDDYIVzajOxSReY1Si9kDJetFNGStI9EN61JaHObuy4y7Uo1h0I2qER5RvUIi1DzpRwxg8OzlURSzNsAKUN7G3w3CLhd5FDW5WJHz/0puExc6IMJCyEqwsQdxS2tow3uEmNMKFcJiNSirou6EasDc7W1m+FU1VzGiDoZapQ4SgkqxMWxYBp7gGSUrCUpZLGqmxZBrLMSrDY/CtNOaZXcJg1aEZIdqjIUdFUtASJESmQSVRTohItEBIpqBJBRAeJokI3elbIQs9LcJXkkoCtjkpgxHlKJakRmKpcOU+asM1c+aOlTZdVSaWMRpzsLMthWqnE51adxcHDc08nYpgrlyePwpEWNBLLuGsVMmuKEsvgbqoP8uoi/wAKZagehUxGWywtpljZG52YWuOo6j0oMkRcGlzQYyOgez+EdrJtv2Yselzvb6UaW7FqbA/C5pLDMbuxKuQwJJuAbEb0mZqQ+VNG2xKJiIxLH7wHxIHNTVzSkroqXdYJ17VSWD8txFmK9d6eDFki3maakPz+VNPVCoAYc71mRYFsNToUtg04BjmlYQZjaqkLIrYDFFWqrVO6M97M1WGxlxWuNVssTJzITVma4RRUCSxrTIg+1MASoAepqII+9MQQmoAgnNKyFJ56UW5D2m9QUtQvRLqZZU0blthDQGPmbCQ9azSiXxqWQTVgBRjArqVSsz6jV6VkZG7sJYdbCqnqXxVgtwply4nFpG+6C7uOqqOXxJA+NFIDD/GPFp1LBg2KLGbMyDTcrsEUfdFMxUaLJ8Axw0a45lkkdiYhMAxRmW6pfx5bj4eFTdagvbYG5LiYseJsMcMsUkJKtIigKkim2km2x2O2+wpnHSzQqmm9GS4fBy4GVZ2UvFYq5juxVTbvFbXsCAdr0kIOLHnNNAPjOWLDYrU7WSYdpG38Jv7wB9Tf4ipKnJu6IqsYqzZc4c4ywqOFMq6XIBuRsTsDUhGUXsCU4NbhLiTMYMLLpkbSHGtL8iORt6H8aEoO+gVNLdgbDcVYUOD2o59RQUJJ7Bc4vmH5eJcLp/fL8xTu/QS6M8nEWFDG0q8+oql05dB1OPUKYfiTC/2q/MUyT6AuupaHEWG/tV+Yqa9CaCHP8N/ar8xQ1CVJ87wx/wCKvzFVyTfIWTRUjzfDX/er8xVbhLoZ5WuG8FnEHhKvzFNG6GTQUizOI/8AEX5irFNDlmPGxn+MfMU6mglqPEJ4MKsU0Qk7UdabMiWI2nXqKDkgEySr1FMmiDzKOtG6INMg61LgIZnFRshRdKUSxE6VCWG4efe1QMJWYRSShc0KSH6qYmY+c5GtypEhXIhZyadKxW7su4HDeNJKRZCJfk2FIi1mq9msdjiprd5IrKel9RO3+BaYRlThjh6aTFRNLEwTV2jMw2OnvAfE2quFWE3aLuNKEorVBD20Y+RPsgjD2SVZWKKxtoZbbgc+fyrVFxV7tGWcZNqyZ0DAZfFC8zIAO2k7Z/NiiqT/ANF/jQvcdK1zgORcd4zBYyQ3eXDNNIWhYk2UubGMn3SB4cj9avdG6M6rxXM6dxTlmHzzAL9llUSIdcZNxpaxDRyLzW428tjvVdnB6lqlGa0OAZlkuJgkaGaNkddip+hB5EHqKvSbV0UucYvU69xJkeIzXJ8DNGurEx6VbUQpII0SElreKq1VxTjKwzlFwzLU5VxLw3icDL2M4GoqHBQkqQehIG4OxqyzFUosE2bzqWZO6JpbzqWYbxFs/nQswdwWz+f1o2ZO4e7/APe+tSzJ3PA93/P61LMncEu/nQsyWgKJXHJj8zUsTLEkGLmHJ3HxNDL4BSiPGZTj/iyf5m/WhkXQOhImc4ocp5R6O361Mi6E0/jLK8VY8CwxU3+ahw49A5vH1I/6x429/tMt/wCY1OHHoLZfxkg4px//ADU3+apw49A/zcX+tmP/AObm/wAxo5I9CfH1LEfHGZDli5fjpP4ipkj0Dckw/HuYK4dsS7WNyrWsfLlQdOL5E8mfR2R4rt8PHKP40VvmL1R4Fi1VyzIlAjRCsNjStgSJDtQQR6yVcC5wKTD0ly1odDhaDZFEIxR2FVMuSFXDvI2hFuT/AL3PhSzqRpxzSdkFRcnZHReCMo7CGdS12ZQWtyFg1gPrWOji1iY1VHSy09S2dHhODfNhzIJb93oKydiVMzcXyRZjo2Vx+Y3J2G9wPyq3GJ1K1vGwKLUYF5WsWJ5AKPz/ADrq5rOTfKyMjjdJeZks74Xj7QyhFKubnbkT1rbRn3bJmKtT7zbRbyPh4YZ+1SwJFiqjZhzF6eXeViuPceZBrFYGJ3ErRqzAWVioJA52BNLF2Vh6iTd2TR7XHgaj3TJHRNGa43yCPExBigLxXI66T7w/P4VZGViqcE9Wc/j4bhv7gpsxXw4lscLYf7gqZmHhxHnhfDfcFDMycOPQd/VnD/2Yo5mDhx6DW4Zw/wDZipmZOHHoQnhzD/2Yo5mThx6En9V8MR7goZmHhxKj8GYf7tTMwcNdRx4Sw9raamZk4aKWK4Pg8BRzAyW2ZUHCUV+RqXJlfVi/1UivyNS5Mnix54Vh6GpcmTxYyThSHoamYOTxZ5OFIehoZgZPFjG4ThG+9HMHI+rMVxBhVjkKrypZj0W9Uz6M9mU2rLcP5RqPkKxSfeZsjsjTaKUI8QUcoSlj1sKFhZFJcSKsFOUTQVTc0DUQClY6QkkqjmdvGhZvYN0tzaYDDoijQNiL38Tfqa8XjcVWqVGpvbkdqlTjGPdNVkkOi9zfUo2/3610ew6sI1ZQb95fT/sw4xuSVlsNwUPZSar3tcWt4f7tWTD4tYPFSdnZNqw1V8WnYuJIC1+m9dHCY6NfEN2skm7sonFqFiSOUNqHUg1dQ7Up1nUSWl9xXTccrKebysqd07HY12uzqsKjcVyOX2k5xjmjtzPZHitaWPNdvh4GuhVjZmPB1c8LPdBKqzWJRIIRUAZTHZbokICkjmNvA0JVIx1k0gKEnolcRcvaxIUkDnbe3qBVVLE0qrahJOw86FSCvJEXYeVX3KrDvs1S5LDexqXJYZNh7DYUSWILEcxUAO0ioQQxipcgxohUuQjMA6VLkE7AdKlyCGEdKlyFeYAX2orUDAE+ckMRoO3lWxYZNXuYpYtp2sRJnZJA0Heo8MktyLFtu1jJ8ewgSAgWuL1klsbafvs7Z7HTfLID5EfIkflWKa77NkdjdolRIYc1MQC5zOFFh7x5ChYDAYwjHcmpcFjn2NxiCkyMszoBYrOAORqyNEpliFewFxmaE+NXwppGerOUtjp3A+Zdtg0JNyl0P+Hl9LV4btuhwsU7bPU9NgKmehG+60Ogwe6voPwrl05ShKM46NCT1bQ5qFWcqknOW7AtNBLUIyllcU99yE2FFr1twCy5kV1NRMw0lGUkC42ubb+Fd3A4mNGWaTsZq9B1qbgkAMmEkcmpraTswvc28rV2a3bWDy2Ur+SONhOycZCpmaSXO7/AdkzQeCk+thXMqdu017kG/Oy/J2o9mt+9IgfMmPIAfWsc+268vdSXqaI9n01vdmex3Esgk7PUFOoLueYJIuLEHkrm1v4fjSuviasc0py+Gn0Xl8wqnSg7KKBcuMxbjS00cUhL30jtQNEipYcjdgSd+QB6GqmqV3LK5LTd23TfjsPee17eRs+FZTpIJv72+4uFdgDvvytWnsyVqso+CZXiFeKYQzXDqVvYXvz8a9DSlrY5taKtcDNDWgy2I2jqAJVhqDWG4jD7cqIGgeIj41BRxiqEsRtHUIRmOoAaUqBGFKhBvZXqEKuIwY+6KfMxXFFX7ML+6Kmd9QZV0MF7SY7Oh8qH9oY+/wDA6z7DnvlieTyD/rNZprvmyGx0O9BDFTGYvSNtzUbsQDLh2ZtTbmkzXJYuiCjYJ89ZNEs/emdwt7WS1/Pcg1nxmMdBqMFdnU7M7GWLpOrOVtbJIKZnwKHXtMHNrsLmKQgP6q2wIpcP2pCatPRleJ7DdOXd9fyZ5uEsV91P/wAifrWhdoUP8vqVS7FxXKBr/Z7gZ8P2qShQr2ZbOrd4bHYHpauB27OlWjGcHqtDoYHB16EWqkbI69CO6PQfhXAiu6iiW7HaajiC561DKkS4qParaVWML3A1coZkwJB6A0jqxqy05GmgmkytejcuPGjch4GgmQDYzJ2aUyKYxcg2MasTZSDcnz0n4Vrp4pRpqLv87FEqTcrr6DocoYWvO/dKMNIVblBZb3uLbA2tYm58bUrxa5RXP1+X/Vgqi+of4cgWIhFvbvWvba5vbatnZ9ZyxF3zRViIWp2Qcxw/Zt6X+VempvvI5lRd1ga5rYYyu971BSdHqDJnpH2qEbKeq5qCCOahCF28qgGMaoQYm/hUINPOoQaTY8qhBWbyqEIpU8qJDmvtOX3DamWzFXvo6D7A5r4Bl+7K/wBbH86oqLW5rg9zpMzmkHKqwajvSSVyItRYcCikQm0CmIfKmRZgF/ZvsCbg+fQ1kxmHlPvxPQ9i9owpLgVHa7un58maeLHvCyzvA8uEQ6JSpIGpgNgwOzAEHpvWPCYONTvSR0e1+0PZ45Yuztfk+ZQ44ywQPHPhWL4TELqhc3JB/ijY9R578+ldaGGpW2PPT7bxt/e9CLhUSqRi2H7GNxG7DfvOuyhfHmKydoYSE6EoR3e3wHodp4mrNKo7o7/Cdh6CvEQ2QZbsfVgo00kmEFZ3jezCHqSPoTVDhxHY0UYp3AuBzTtJihP8BYfBlH/dWiNDJDMjQ7LQLUAHgaCIJeoQS9C4TwNC6JYt5e1nX1rbgZZa8X4lFdXgzQyC4I6g17CL1OS1dAJX2reYBlQAKxONdXIttWedVxdrFsYJoopm8jPa23WpxtA8IJpIx8KZTbK8qJDq6UczJZA/Ncd2S6jQc2iKFz2CxuuLXanzaXFy62IP6SPSqPaC5UBrZn5VPaA+zkT5p5VPaED2cZ/TNT2hE4A1838qPtCI6DMn7S11QI9vGtUHdMyyVpo1n/h5N8LOOk34opqupyNNNbnVpEqtlhGopSEopiHtVQh8elavuVZbm09meKDyy4GU6osXGV0k8pFF1K9GtcfAVTUdrOJck5K03c1eU5SnZtl0sTrh31HU7KXhmVrLJtyBrNTqVFJuo1fw2LXGGVKCAeF4exUP2jCPGURwWDHvI8kRJjI321b7+lNUbVnuNGS5WR2GGZLDvLyHiK8T7NVitYv5Gpzi3uS6x1pHGS3T+QRrNVE5W3GSMzxm3cj/AJ/+00cJLNOXkaqHMyuTzacdCPvpMv0Vv+2urKGbDT8HF/VfclSVpx+Juq544hpbBIy1I2Gx69C4Rt6RsJPh5bEetX0amWSZXON0zUhq9umcUx8eLvJJGvNHZSPjtXRhrFM5k21Nou4QHxosMQRnA3PhSuKZqpU7mTwGMZpWToaqcEmXTeV2NphJSqi48KtUbGaUXJ6E8ExN7ii7C8Noz/EsiuNBquSHj3dWW8sQDD2HSi1aJVe8ijprnvc2rYbIlAYE53i+yjL238KenDPKwlWWWLZh8Dm8va3ZtjW2vSjGGiMOGqN1O8zU4PEljvyrDax0nZ7FjjvD6sED0IrpUdjl19HfxCn/AIepLJiUP30b/pt+VCqrWLaTu3/Op2GR6pbsXWI1FBBFvTXIJagQ+QC1WDFjLsW0UqSobNG6uPVTehJXVhovU6D7Qs1lSaLEQFewxUSyqNCmzcpFvbqR8zVUoKauyymlFtWRqcW7YzBRTYfR24QGzDUZEj/eRggg6l1XHkaqjK8cr5CzglO/L+WCa8Oi43NjYjdvEcudefqY2rHEqkrWkrxduu34NahDJfW631EjyYb95xbnZmvzt1rPHtWu4TeRXjutdtuvJjSw8LpX38vwPTAvqIE0igAFTdTe973BU8rfWo+22qcZune91u918+onsyva/oiti8c8aXkJezumkpE5uhNiBpHMC49a20sdRqVVTcN0nfu87eBFRllck9vP8guLP8MZU/ZJ2gDMh+zIGG3esyy3vY+Fb6csPOMu7pz0X2aFnCrFrveWr+9wmOI4jc9zawOoTpz5bBW8/GqXQwElmS/5L6Nli9qTy/h/ZEqZzhiN3TfpKq//ANQtVS7NwkldNr4/lDKtXTs16fhlkNEw7hf4dnL9Y2rPLsalbuzf/wCX90MsXLmvr+GNxxjj5yEt90Kpb4J2gb6Uj7IpwWac/T9y6FWpU92P1/BncZjcSX7jFV8L4Ylvie3qRwOCtrL1/YttX5RT/nmibBxzue/Ow/8At2/KeroYDBf5v4f9Ac8StoL0/JpMBGy2Jxz+mlVHxD6q6FKnQg9Kj+L/ACjFVjWl/wCmvh+zA0kKrmMzrJdZAjHvA3OgAkWAHhXZoyjKmsrujj16bhK8lZs0mEkB5G9MyqLOecV5k32rsg1halq3jG6NWHqq9mNwiFJQyi9+fyqpKSV2XLLVk7s2eXHWQDTxldCThk2C+JiAXaiVxlrqZHO8JvqIqqcmmPNKSL+VgGGrt0Yr2K/2YXpOBEbjs8cMKns8RuPIoZplKyIVNGNJRd0FV3zMLiOGGDd2+xq+19zJK17xNFk+Xk2W3KqXQTdy+FdpWNFn2UF8KUt4VbTVmLNZ0VvZDljQPMD/ABBD8tVDErRDYeLTdzqNjWKzubBwpgCM9S5BmqiE+RFW9X2K8xNFFQZdBHRMry443KTCP3uFl7SO/jG+zAeQv9KqvZstktU+ugU4ayLFQ4dkDaXjkXEQMP4XW+tSPFWUuCPOs8pXldIsairJv/o3mY5oqRxtobvvo2HuMRqAbfYHe1cXtPBzrwp1KStJb+HP6ho2U3Bv9z320GXTpI1oHubAd66keoIpH2bP2mVTTLNNNeLX5DxFktzTAWX5+0quwwc6aNrSiOMt3tJ03bw3Ppyrnvs1wozpSqRbVpaXdraPl4+hepuUoySeumpFmsgYKW7oLBrczcCxtbnypYQkqdOpHW14/J3Xo/QvgkpSi/5cz7xYft1ADO6bAqCdPaqL6rHlZh4bXvXZjGtTxDV0oy68072t8TLKdOdJc2v2/mwPxmRKYnIB7+hrG+xBO31NJhsZOKlF/wBv5saJ0ITlF9fw/wAGfzLLQIIRp915l8fExt+ZrpUsReN0yieGSk1bp9zT5BgmDwyB3Vfs0SlVZgHsCNLAHcbVkxWJcbZd+pZQoRad+ppM3sIUUALbFKbDbZoW/MGhi558EpP+aGvsiKjiai/2v/kioQfAj5D864KnbkdlWEs33v8ApT/203GYdOnq/wAjJmYKSG3Av7qf+2iql3ayGiotpW9X+Q9lmVIyLIR3j4+hNer7I7uFj8fqeK7ZebFSXS30DOFwwTlXSbOWlYo4rJoXk7RlBbrapdk2JkwMf3R8qNyIuQ4ZQbgUqVh8zZbMYNEJUxeEVhYilsmRyZTXDhRYDaiVND48udhcJ6X2J9KmdIKpyetiu8NjYrY+dG4trEToOlG4LEBwq3vpqXBYv4DBLztRuPGIUlw4K2oJ6ltiHJcIEkNhzH51KrvEMdzSpVCLB5FEBGyioEj0igE+RsMm9amtDBGbzFxrCqTpxlZHSfZdjFG/ge6/8rbG/pz+FZ53UrjuanGx0kwyi4CpYcrk32+FRprZFSd9wXiMVpUNLGwUnsnUWPjdZOexFrgiqJOybktOZbHV6Mo46TswFJdtB1LKbEMsm62N72uD9a5eLpQjTinKXdd0/M20ZSnJtJa6W8iNsxXWzFW7wJ0i2+25X1rN+j7Rm17620t3l+SzLU4VtO79gTnssLQ2Jk962pURyLg3Gknxtzp8FwFGUFfRp62Xh+OgK6qXT0100u/EgwzxExkGfZQL9nGoa2xuSwO4AFvIVorSo3jNvp47PzK6cKlnFL7b/AInstxd/E20rcXN/v8A96s3DoKrUV3qnfT4/YvjKrlg7Llz+HTxKkmWQOulmf3yw/Zr0AIPf8hTQnQVLSTtfp1RY3V4msVt16Py8Q1gsBFpXSW7oAtpUDYk/e86lVUpKLzPbp4vxK4zqJyVlv18F4AviTtO1W37ksmxIDdoqtyUX7uljvf4Vbibexq21zX2Vb2ip1yvytdc/wBhhrgHWR6oEixXun0p4e8h6fvI9ieOYsL+yYG6WBt5gN+de07KhfCQfn9WeD7Wqf62a8vogvknF0OJYKh3Ivat7i0c6NVN2DjzWpCwcslQhIs9qgUy3hze1zYE2HUnoKSU7FsI5iHC53hGcxh1DXt3+RPS/hU7241kEBhI2bYaWUglfAjwPpUu7C5VcD4udi5JuCDa3K1MkrFUpNsnhftVKN7yi6nxNuYNB6DJ5lZgqWYDmaYquURmiltIF6Fx8mlzQZfICKYZIInlUHIMIw7UDyNSa7pFuGyKqHFAqEEYVCEJFKE+SY2tW45TvchxWJvVTRrjNtWND7O837PEBG919vnVVWN1ctpSadj6HwM+qNWvc20n1Xa/xFj8aqi7ouasytmyEqQBe4P+Yd5b/EEUlTYaBn4rur4bnqXVCT5kPo+JG3n61xYz1nhJc/d+tjpNWy11/wDL8lNYwVRiLFGKHqL3IHzDVy6uZUFLnB2f1X3NcbZ2uUlf8jzgxqcddx8RVv8A7lxW007fFXXqV5v0ovo/poyL7MCqnofx5/lWfO5YVv8Axl6NflFu1XzX0I3h/aEj4/I/oK1Kd8RBv+5L1Vivak10f0dyzFHc28/1rLh/6VSPSz9bfcvqaTi/P7fgK4YWuB5Vrb/Sh8fr+5n/AL5fAE8SqdKHpOB/+s1qqv8A0VvH8mnsxf6qb/2P6xKhFcE6yEtUIRYr3T8Pxp4bj0/eMRxLw5PNiJWAsO6wvtcdmtiPlXuuzYZcHSv0+7PC9oRlPG1Guq+iJvZzpXFBL94Dfpsd63T2OZaKfidPxOYqHKeNU2LkrltJ7Lc0CZbsvYWO6h25HZF8WP6UjlfYdQS1Y7HYyJJ40kSwWxDgkaCfHTyIoKLaux3JJ2OYe1TCPhMUZFU9jiO+jDkH/jXy33/xVZBXRXOTi/A3Ps4xUkmDwksrFnZJ1BbmUWTuX628D50k3q0PTTaTfj9Q7mSrIgmXmNnH4UY6aCTV1mRWydv2o8lYn0tRk9AU/eOR8QcRSSOzIbICbee9UOd3Y49StKc9GBsm4slE4Fri+/pWhKyOrRUtEzuOSyLIisPECiX5XEKSCymogMCZXjr4pF66h9KsnHuCp6o2ZrMXDdVQg1noEGXqEPjwy1quYlEhdqDLEh+EmKOrjmCDStBvzPo3gTOBNFa9yUDW/vJs3xKkf5KxrSTibHrFSDOKxUZBBkC3/i56TzBt42NI5xvZsaMXugLm0fZuhLKCL23HeQm4ZOo3rk43DSUoVU1o9291ubcPWi1KFn8thma4iPWxLqmtFkPvbsHOl7AG2wsasxdKnUzapZl6rZ/IGHlOKWj0fo+XzIWxsYZSHG4tfex8dj8a5/Dpx4dTP7umz1s7/Q0d95o5d9d1zGNi4bOC5spJNlN1AOrcG3gKsWGoqVSnmfe1tbaz8wZ6ryysvn1+AjYyAsu797YbADw8zbmKXLh4xhPvPLpy5O+vzGy1W5R018+ehfOmytpNjb+IbX8dlp/0I1KkFB8+e9tRf1ZRjJtcuXwLmGG5sPAc7nr0tRjUpuldQVr9XzX7AcZZ9ZcvAB5/hmk0uoclJVXQt9JB1Lr0m5LXA3vyNXVISq0csVyT082a+z69OlVfEdrpq766P7EKBdN7Ns/ZHkLSXI078jsflWGPZta2sH80aZdoUE/6kfV/QkdbbGJvfEZu3Jja17eG43q6PZdX/Bf/AG/BS+1KC/v+UX9yNoXaw7AgErdjqsupoVW56ntgbf3W6VYuyqvgvmwf+Xoxejk/gvyYXNOIXRCyWvJva99ItYCvU4ahwaMaf+KseTr9oOrWlKKtfXyLvs8w8bYgSD37b+W9XVNjDTk3PU6DPgIlkMjML1Vd2NWxZixMbEIN7kD50rQyepaxOIb7QqBSFRlUbbAC3KkVspZKXfsN4liBmF/FB+dND3RajtIlzDIUxmBGGm3PONvEFfdPy29KrlUUZlqg5Q1FyvAHDvhoF/c4fCtHqNhqdilvoh/zVTPEU1Kzeu5bCjPLdbBHKIbo6sOe3wIqxVYTfddytUpRjaSBBw0kUWKksSxjKRqOZaxG3xI+VCpNW3KuFOMZNLW2hxTPsBLG6RsrKGHiCL9bX51MNFayObTwsoNZkCsiwZGMRCPGtdro3U3aSPoLIcMUUbVWbHJMLzbqfSoiqRi8Btjozf8AjI+amtM/cZSt0dK8KxGkaaBBhFQh4CoQ+dxwNflQVZgeHiPX2eMetHjMHAj1LX/0zIXUxtSyrtDxw8XzHcPY44DERhj3VcX/AJT3W+hNZZVLvOuRuhRShlNjmWMEM8kBA081sBYo4up+R+lZcSnCd1tuXUFnpq++w3DysY2icdom7qrXBXqY2G63seorNOvq6cleNrpPw6fAZU9pxdne119yri1DvHMyhQVKEX2AXwufJvxrNPEXcKiVlezS8/wXKnljKF9d1/PMiZ4YwYi6l4TqZBu9lOknSNyLNelWGryjVhle6s+T66kdempRlflqKMYraWSF5I5rXdVPdt3DqX3rWAPLcVqhg6zqwqPSySa66WZQ8RTyOK63XzuVJswtdZOwjZCNPaTRqGv3Tcagw8CNt/Kmp9lyVPI3zuCWOhnzLpYt/wBNoNLNOgC2EqIrSd837oZFbTfmBzrSuz4587ev7W+hS8WstuX8YcwaOo78hOqxtI0aOo3sSFKMPDbTerY9n0oK1tOl2VvGOWvMccbHsn2jDiQuumLUWkazXFrk+trXtzNaaVBL3bL4culyirWXP6lg4KQ3vIBqcOQqJbUNweXOtHDfOTM/FXKKJjg33vNLvubOwH40eGur+YOLLw+RHNlmv3nkb+Z2O4vY2J57nfnRyRFzz6lQcKYW1jEDbqBVmeRRwIdC9luRww7xoF9Bag5N7jxpxjsSYnL0Y3IvUTC4gzETGKSy2AFiBYetcnFVZxquzMlSq4T0YQxuZo+lktcjvdQR4GqKtfNZosxEqcpKa5ofl8mt1U8j5n9aNKq3JJkowUpJBM4lTKqjkO6LG1vOr3VjKqtPianVeaybt5nsxAsD435/CsHakYqKdtWzpdnzlJtN7FXBzFGuPiOtc/CV5UJ5ltzRvqwU42ZI73N+pq2VRyne+7FUbKxR4qyyOYx61vpBt5Xt+lekwytd+RyMU9viZ+Dg6AzrMBZlrbGbSMltbm4gUAAUjLkOm5USMyuGw/7cN0kH42q9+6Vo6AvKsZoPaahBGSoQbagQxWS5MUXvUGkS7DccKLStpDxi2B89zAaSqi58qwYjExWhuoYdvVnPsTkMkrFmHOufLGpbHQVBczRLgDIIxID2qqED7G4BOnUD0vTUMTxbQcG/HwKK1Ph3lGVk+XiT5/lU0aJLHMv7I20mQRq3MkEstiPDnbeur7LTum0rrzdjmSxE7PV/kzGEweJnLJEcAFJ1PGZWxIv4HSCQp9BV0MPGO3poZ5YiTetvi7ljBCdpjh/6Qj7UD3IMPYKAPF2XYbgePMUZ01FXsSnVzyy318CXPM2hwo+zvGcbKD+0MoGi/wB1vDbog9WNWwoyau7JepXKvFSyq7foDctztpZFhgwsGH32EcVrG/MWI+dPUoxjHM2V068qk8iVi/mBftrl1EaHvvp70jDmBvy8Krpw0u0asmZ6MP4XiOLa0YtyGw36Co5JMWVJhLEYeGMjESqupL2aw7rMO8QfpTQXMqqWXwGJxJAeTCrLFeZDRxVhtejWNXSmyO1xONG9ixJn0Ki5YAUths6Il4ow5F9YqZWDiRIxxfhdQXtBcmw38TRyMHGiGcTiQsZk8AL0hctTHJmq4gmUCwJtY/3dvyrkYvWqzlYp5arTL0LA1lcQRkghBHyNCxqh1RfwK2dfWrqKtNFsNy7mfuj1/I1X2t/Tj5/Y6/Zvvy8imhrkQZ1GTKK0RVytjs4kAYX6V6jD7M42I5FODFL4VoRmL8c4o2HTJr3FQIL02b4j8at5CmpjbYVlLyQGoQRmqEI9VC4xnc1zZI9huegrJXxMYI0UcNKbBmHaSXc3A6Vy3WnVeh0OHCmiw8CLVFSC5jxk2N0KBcjakjSTC52HRYXSxbfV4/3f7o9OvWt87YeKjD3vp+5kj+s3J7fX9jC+20j7NED4uOfpXQwN3q+hixllZLqcv4a4jlwbM0Vu8LEGulpazMEotu6Zu8vx7YLL5Mwk/wDM4ogRX5jUCU+AW8nxTpWZviVbco/X9jRCHCp35y+hg34jmJBvcjrvfzrXKdzLCm48zbcF4uU4XF44JreJdKgeAtcn/fSs9XvSjHkXU1kUpczF4/ieaW12sB4CtCklshLTtqzS+znHS4jHQxMe4mqQjrpG31IqirFWui2nKT3exPxZ7R5Je0gWPSFd1JPM2Yjl4cqtikkUSUpMzicWygAWGwqKwjhJ8yhHnDiTtPGreKI8MrWCOJ4vlddJG340iaQzpSas2Rf1kbTpAtRzIEqTasbzgPJcFi4o5JmkWbUSCGAQlXIAG3kOdcnEdoVKdd000lyv5HRodm03RU7NvmdYky5SnZltrW572pJVq72a+RdGjTi+YJHC0US9yMsB4Bjq35kXIvWCpTxMnfMvkLVwmFqzc5xu/N/kuRZJFYEAfEkH5HcVRwMR/n9ArB4RbU/r+SQ4ADkwHlcVbBTirTaKquBi9aenhyH4VLOPX1rRR99GThyhK0kT5sO4P5h+Bqvtdfoxfj9mdLs3+o/IoQ1xaZ1ZFhOYrVT95FUtjI+0fjNMHiEiZCxaMPt5sR+VeowtnmXR/Y42JTWVpdTCv7S7ElYzatDi+TKVJc0GMt9qcVhrRgfnVijfmVOTXI12U8c4aUbN8DTuiyRrJiYvP0B2PiPxqyNMjmdBw3uj0rAayYCoQRhUIREUBjGR4VV3O56nc15Zp/3M7uboSfaCNgKHEa2JkT3ES5O4pVmb1GeVLQshSXjUD7zepUDSPmb/AAro4SF6i+ZixErQfyLgiozpSnN33BGcYx0MZ7T8jOKiVV5qb108OuHuc/EPPsc2xfARgMJxEgVZJI0I8QrMATf0JrU6ujstlczKErq73dgz7WsDMZsPF2TrEkQKkKdGuQ9+7DYWAVbHkFoYaDjBX3Diarz6bGDzrKlgKr2gYkX2q2LuJqmGuBszxaF4IGXspN5Ef3W2sRfnuNqSq4wjmY0FKTyxD3Gj4ebTJNhFhfSFDRFUWy35DkedVQq5n3WWThlWqAWRhcLKmJgkeMryMiHTY/3htVksz0a+RUppap/NBifJIcXIZ5QS0rameFwwa/Mlbah8BVXFlHT6otUU9fo7mb4t4bbDzuEX9mTqSxaQKp5AyEC7dRzFXwlGS0ZVLNHdArB5XJIwRRuad6K7EjPM7IjxeAaNyhtcdKi1VwuVtyzhsjldC4FlUXufH0oNpOwU21dG44A/8sB0dx9QfzrzHbKtWfkj0HZsr0UdVwoGhdh7q+A6CuA6kupoa1Y+Z9KswUXAJ5dBerIVG2kI0A14jd9awmJ2RHIGoWJRpAASD3ARGDff3x610eBazqXV7Lby+e/oZ897qJL9uxd/ehAX953jf90jnR3SGF3IubX25c6TJTS3fht1a11Ddmmwh761r7Nfu36s52N/qryLGbD9n8RWntdf6f4ofs9/rfBg6EVxKWx1ZliIbj1FaqS768yqWzOQe2vASTZmqot7YdPT35L/AJV6bC2Sm31+yOViHdRS8fqcz+yvcixuDY+tbUjG5pB3BcJTvCZxYKOYJs23Palc1F2IlKSuloXMuyWYWKsPmatVexS6Epam1h9n2OlVSZEUHfxJorEojw03uzteEisig+AArIblsTWqBEIoEG6aliGInludq8PUrO+h6SMNBms0qqTDlRJHiD41fTqSuJKCLyaZLAEgjcFSVYehHKurh80msu5iq2incpvjJVn0GRZFXbTIWV7kcyQLNXTVdJ5ZPUwOk2s0VoBjxtAWn1dnpw4Gr3muSSAFYgXY2Ow6c60Rbk1ZblErRvfkZ/MeMskxdvtcMlxyJWYW9DFKfwq9RlHoU3hLXU0eWcb5WAFTGlAAABIZENvC7NGCfUtSZLcvUsUr8/QmzXEYHHwvB9ugKvb3WjZwQbi+qW5F/AAUU2uosknpdGSwfsqkjcPBj42seRiYXHS6M9GclJNP6EhHK01uVuJvZxj5XLB4GAACr2rLy57OgH1quioU42uWVlOpK9gC3Auax6dWGaRAfdR43Bt5KxvWjNHqZuFLoKeC8dIQ0GFlja516rIiW/vE0M62YeE73t9PQO5XluNhus+ZwDbZBI+JYf4FU/Ks83RfI0Rp1Y8/mFJsVhI47yxGZhzmMcWCX01MQ30qrS9o3+ZZayvJoxebYrLmDr2axuWuJEeaVx1ViQsdtvBSbnw51qpupl1Mk1DNoZ7DRzSBtLXRF1EE27o8vGrW0itRvdG94LmR4SUTQA5Fue9lua8x2yrVlfp+T0HZj/S+P4Ol4T3F/lH4V5l7m2W5Maa+ugoIhyaQWH2i/wC73Man3Fsw58mJJ8tulbvaYP8At68+r0+W3iU8OXUnTKXtbtzzB91trOGABLk8gQb3vc0/Hi37v8t5C8N9Q9hR+0X/AH1rodnq0onMxj/V+BZzUfsz6j8RWvtVf6Z+a+o2A/rL4g2GuFT2OvLcswDvD1FbKCvUj5lNT3Wc39rcjLjIjHJ3ioBQbMR3t79K9PhlpK/X8HFxcmnGzM1hMIEjEhhMdpbPK267+BrQ3ra5nStG9reI7NkCzMnbF4XsxVDt5ipDbbUFRd7fRlmLAxM1oVYDbnfY9al3zCoR/tOtcM4lljVHbVYDfx+PWqmaIvkaqJwRQGHGoQaTUCJqqXIc6kI+9XgnSk2eozIjeZRzarYwl0BdEaP2ziOM3PlyA6mtWHoVJSSSK6lSMI3ZqcvwSxLYbnxPWvS0aKpxscKtVdSVzM8WziJ5ZmUhUhLiTUunUFcBCvPVfTb1pJUFKopBVZxpuJh/ZvwlDisHI02oAyi2k2voS1z8WNbak8stOhijHPHXqH09neXxuGKyNY3sz7fGkdaQ/CRBm3CGBlkaRlkBbwDADYW2FqVVpJWDwk3cr4ThLL4nD9lIxXcXe4v1tUdaTViKmkRScG4F3LqZkLEk6XA3PTapx2icJBjK8rigBCT4triwJnfb0W9vpQ4rYchZxeJmawEoKjl2saOb9b7D6Vz8TiMk7WNtCm5RumQZbiSGMLyEqBrdI9EakOSACqqNjZr7/jVuHmpxzKNkJWUk8repXx64TDSLitMxa72RXJQARve0fLkPma0yblDKv5qURtGV/wCbGY4/zaPFSYSEXVJNMji1iAzBQGHPlroYaDjmk/IavO+VFmfh7K2JYie5JJ748auVSRVkRCeHMr8BiP8AOKPEmDJEMZBgcPECuHD6CbntCCdVgDy8LAV57teTdRX6fk7HZ6Spu3U3uFHcX+UfhXm2tTW9yamVhR61bFCslVaujERslw371fT9a7GAXej8fucfFv8AW+BZzuRVhdmIUCxJJsB3hzJrZ2pFyw0kvD6oswWlePx+gHwuLjYd11PowNefg7bnYlF9AhhfeX1rdhbOrHzM9X3WTZnlqSX2UPtZygYi3hvXooaI5kiquUNo0dohUm5vEN/herBAdmnAkE2kg9mw5lFADf4aKk0LKKZNgeDFjIYPe3MEbGmzAyh8ZcB7oUfClDYswwsvK31qBLQqEEIqEIypoWDc5+yx14m/iek1IBg+0bSov+Q6mrqFKpVmoxFqVY045pGhy7L0hWyjc828TXpqFBUY2Rw61aVWV2TyTAc6uKTNcX8Nx41VEuqyG62sDfx3te1NGTjsJKNyzkGBWGNYRsiCyiwH/wA1Hq7hWisEJMIDQyhuU5ctWplJcqSZavShlJchOXr92g0FMrzZeOYuKWw1zOZjmhw7Sq8oi7QIYZpIzLGrCwkRkUEg2W4Nrd49KV4dVJKVr20sOqzgnHqDMtxwkx0+Kj1NAUEamxQMe7cqrbhQQefWrIw4dNQ+IkpZ6jl4WF4gknmuFiO2ykNYgg3DA+BqyFktSmblfRGey3LXWXtZ9TPzBY3+J61Y8trIRSlfVB64PjVZcnchml00CMJcOZitnDCxAZhfYMFW5APXb/e9cXtShKU1JbaLyOlgayUHF7nSML7i/wAo/AV5aS1Z0GywtNEVk0a1phErbJ0StUKdypyKo7YYkEBOzCjnq1X3+Ft662FhlaZycTGTrZvAdmmVdurLM5dT/wAOwEf+Uc/iTV2KhOcdG0/A0YGo6U7uz80gdl3COE/dtBH3d17i+6fh4H8RWahhZzb4knfzZ06uMlG2TRB/LcjghN44wvp+nKt1LBUoSzW16syVcZVqLK3oEmrYZGIFphGPUURSQCiQkFQA6oQ9UIeqEPVCHJ2x9vCvAwhKb3PUuyC+QYw3Ybb2J6/Ouz2ZUdNSW+pz8bTUrMNviLeH1/0rrPFNcjAqC6kDzg/w/X/SkeM8A+zLqKmJ8LfX/SosY+nqH2VdRGxA+79R+lT21/4+pPZV1IzIOn1/0oe3P/H1J7IuonaDofn/AKVPbn/j6k9kXUaWU+B+f+lT29/4+v7B9j8RCB0PzH6VPbv9vr+wPZPEjfDIed/mP0qe2/7fX9g+y+JSxPD2EkN5IQ382/5UVjnyXr+wrwSerfoew/DuGT3I9I6C1vwo+2N7r1/YCwiWzHrkMFye9v51Hi/D1/YPs3iNfhzDH+E/O9D2vw/nyD7N4lduE8MfvfC1T2vwD7MEMP7PsIyBtUm/p+la4d+Klczz7rtYkHs4wo5PIN7ixW4I5EbVJUFLdhVW2yDK5CQABLsBbdLnYW3sw/CuZ/4Ohe+aXp+DQ8bPoh39CN/bH4Iv5k1ZHsfDrqI8XUZ45G3/ADMo/lWD84zVq7MorkI8RJlefKGjGo4vEHflbDD/ANGpPB0aazW+v5GhVlN2JkmUWvqJta503PyAFSNSEeTDKjKTvcl+1L0P0p+NF8mCNFx5jTKhZWs11vbl4ixB8v0FBVYXvZjuMmrFgY1eh+lWcePQThs99sXofpR9oj0YOExwxi9D9P1o+0R6MXgyHDHL0P0/Wm9oj4g4Mhwxy9D9P1qe0RJwZDxj16H5D9aPHiDhSHDHJ5/IfrR40QcKQv21PP5UeLEnDke+3J5/KhxYg4chv29Op+VTjRDwpH//2Q==" alt="Profile" />
              </div>
              <div className="profile-details">
                <h1>{profile.firstName} {profile.lastName}</h1>
                <p className="shop-name">{profile.shopName}</p>
                <div className="profile-stats">
                  <div className="stat">
                    <span className="stat-value">{profile.totalSales}</span>
                    <span className="stat-label">Total Sales</span>
                  </div>
                  <div className="stat">
                    <span className="stat-value">⭐ {profile.rating}</span>
                    <span className="stat-label">Rating</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="profile-content">
            <div className="profile-section">
              <div className="section-header">
                <h2>Business Information</h2>
                {!isEditing&&(
                  <button className="edit-btn" onClick={handleEdit}>
                    Edit Profile
                  </button>
                )}
              </div>
              {isEditing ? (
                <div className="edit-form">
                  <div className="form-group">
                    <label>Shop Name</label>
                    <input
                      type="text"
                      name="shopName"
                      value={editedProfile.shopName}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Phone</label>
                    <input
                      type="text"
                      name="phone"
                      value={editedProfile.phone}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Address</label>
                    <textarea
                      name="address"
                      value={editedProfile.address}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-actions">
                    <button className="save-btn" onClick={handleSave}>
                      Save Changes
                    </button>
                    <button 
                      className="cancel-btn" 
                      onClick={() => setIsEditing(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="info-grid">
                  <div className="info-item">
                    <span className="label">Email</span>
                    <span className="value">sparsvishan@gmail.com</span>
                  </div>
                  <div className="info-item">
                    <span className="label">Phone</span>
                    <span className="value">{profile.phone || "+9198765XXX"}</span>
                  </div>
                  <div className="info-item">
                    <span className="label">Address</span>
                    <span className="value">{profile.address || "Mumbai"}</span>
                  </div>
                </div>
              )}
            </div>

            <div className="profile-section">
              <h2>Bank Details</h2>
              <div className="info-grid">
                <div className="info-item">
                  <span className="label">Account Number</span>
                  <span className="value">{profile.bankAccount}</span>
                </div>
                <div className="info-item">
                  <span className="label">IFSC Code</span>
                  <span className="value">{profile.ifsc}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
