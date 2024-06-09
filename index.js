class _img
{
	constructor(_path)
	{
		this.path = _path;
	}

    toString = function() {
        return (`
            <img src="${this.path}" onclick="set_active_large('${this.path}')" >
        `)
    }
}

class _vid
{
    constructor(_id, _html)
    {
        this.id = _id
        this.html = _html
    }

    toString = function() {
        return (`
            <div class="h-fit w-fit cursor-pointer relative">
                <div class="absolute top-0 left-0 bg-[#FFFFFF80] z-10 w-full h-full" onclick='set_active_large(${this.id}, true)'></div>
                ${this.html}
            <div>
        `)
    }
}

class projects
{
    constructor(_id, _name, _isVideo = false)
    {
        this.id = _id
        this.name = _name
        this.isVideo = _isVideo

        if(!_isVideo) { this.images = [] }
        else { this.videos = [] }
    }

    newImg(path)
    {
        const new_image = new _img(path)
        this.images.push(new_image)
    }

    newVid(_html)
    {
        const new_image = new _vid(this.videos.length, _html)
        this.videos.push(new_image)
    }

}

const printings = new projects(0, "printings");
printings.newImg("./images/beauty_center/CARD_mahal.jpg");
printings.newImg("./images/beauty_center/wajha_1.jpg");
printings.newImg("./images/beauty_center/wajha_2.jpg");
printings.newImg("./images/beauty_center/Royal_garden_hotel_flyer.png");
printings.newImg("./images/beauty_center/Dream_suit_hotel.png");

const books = new projects(1, "books");
books.newImg("./images/book_covers/Book_Cover_Final_Outline_press_(2).jpg")
books.newImg("./images/book_covers/RaksatAlReeyah.jpg")
books.newImg("./images/book_covers/rootedness.jpg")
books.newImg("./images/book_covers/zakiraLelghad.jpg") 

const magazines = new projects(2, "magazines");
magazines.newImg("./images/alshatek_magazine_gelaf.png");
magazines.newImg("./images/Nasamat_gelaf.png");

const films = new projects(3, "films", true);
films.newVid('<iframe width="100%" height="100%" src="https://www.youtube.com/embed/1Mk9ldXm2dk" title="Elite AD1" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>')
films.newVid('<iframe width="100%" height="100%" src="https://www.youtube.com/embed/7bOeu_SOn3k" title="new intro cubes" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>')

let projects_array = [printings, books, magazines, films]
let activeProject = 1;
let popup_status = false;

function update_active()
{
    document.getElementById("scDiv").innerHTML = ""
    document.getElementById("sc_0").innerHTML = ""
    document.getElementById("sc_0").style.backgroundImage = ""
    
    if(projects_array[activeProject].isVideo)
    {
        let vid = projects_array[activeProject].videos[0].html;
        document.getElementById("sc_0").innerHTML = vid;
        
        for(let i = 0; i < projects_array[activeProject].videos.length; i++)
        {
            document.getElementById("scDiv").innerHTML += projects_array[activeProject].videos[i].toString();
        }
    }
    else
    {
        document.getElementById("sc_0").style.backgroundImage = "url('" + projects_array[activeProject].images[0].path + "')"
        for(let i = 0; i < projects_array[activeProject].images.length; i++)
        {
            document.getElementById("scDiv").innerHTML += projects_array[activeProject].images[i].toString()
        }
    }
}

function togglePopup()
{
    popup_status = !popup_status;
    if(popup_status)
    {
        document.getElementById("sc").style.display = "flex";
    }
    else
    {
        document.getElementById("sc").style.display = "none";
    }
}

function changeActiveProject(_id)
{
    activeProject = _id
    update_active()
    togglePopup()
}

function set_active_large(content, isVideo = false)
{
    if(!isVideo)
    {
        document.getElementById("sc_0").style.backgroundImage = "url('" + content + "')"
    }
    else
    {
        document.getElementById("sc_0").style.backgroundImage = ""
        document.getElementById("sc_0").innerHTML = projects_array[activeProject].videos[content].html
    }
}