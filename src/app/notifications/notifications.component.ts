import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  notificationsData = [
    {
      id: 1,
      time: "5 minutes ago",
      message: "You have a new friend request from Jane Smith.",
    },
    {
      id: 2,
      time: "2 hours ago",
      message: "Your post 'My trip to Hawaii' was liked by Sarah Johnson and 12 others.",
    },
    {
      id: 3,
      time: "3 days ago",
      message: "You were mentioned by Lisa Rodriguez in her post 'The best sushi in town'.",
    },
    {
      id: 4,
      time: "1 week ago",
      message: "It's Jane Smith's birthday today. Send her a birthday message!",
    },
    {
      id: 5,
      time: "2 weeks ago",
      message: "You have a new message from Tom Williams",
    },
  ];
}
