import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-newuser',
  templateUrl: './newuser.component.html',
  styleUrls: ['./newuser.component.scss']
})
export class NewuserComponent implements OnInit {

  @ViewChild('techstack') usertechstack: any;

  selectedItemsList:any = [];
  checkedIDs:any = [];

  techstack = [
    {
      id:'1',
      name: 'React',
      img: 'https://reactjs.org/logo-og.png'
    },
    {
      id:'2',
      name: 'Angular',
      img: 'https://repository-images.githubusercontent.com/24195339/87018c00-694b-11e9-8b5f-c34826306d36'
    },
    {
      id:'3',
      name: 'MongoDB',
      img: 'https://1000logos.net/wp-content/uploads/2020/08/MongoDB-Emblem.jpg'
    },
    {
      id: '4',
      name: 'Node',
      img: 'https://nodejs.org/static/images/logo-hexagon-card.png'
    },
    {
      id: '5',
      name: 'Vue',
      img: 'https://miro.medium.com/max/1400/1*-8AAdexfOAK9R-AIha_PBQ.png'
    },
    {
      id: '6',
      name: 'Django',
      img: 'https://d1wrxu8gicsgam.cloudfront.net/wp-content/files/django-logo-big.jpg'
    },
    {
      id: '7',
      name: 'Python',
      img: 'https://mpng.subpng.com/20181128/cbr/kisspng-python-programming-basics-for-absolute-beginners-michigan-python-user-group-5-jul-2-18-5bfef921c53528.7857216715434365778078.jpg'
    },
    {
      id: '8',
      name: 'C++',
      img: 'https://raw.githubusercontent.com/isocpp/logos/master/cpp_logo.png'
    },
    {
      id: '9',
      name: 'Java',
      img: 'https://1000logos.net/wp-content/uploads/2020/09/Java-Emblem.jpg'
    },
    {
      id: '10',
      name: 'Github',
      img: 'https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png'
    },
  ]

  constructor() { }

  ngOnInit(): void {
    // this.fetchSelectedItems()
    // this.fetchCheckedIDs()
  }

  changeSelection(event:any) {
    this.fetchSelectedItems(event)
  }

  fetchSelectedItems(event:any) {
    if(event.target.checked){
      let index = event.target.id
      this.checkedIDs.push(this.techstack[index].name)
    }
  }

  printPreferences(){
    console.log(this.checkedIDs)
  }
}
