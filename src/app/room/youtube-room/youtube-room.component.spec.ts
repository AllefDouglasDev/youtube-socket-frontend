import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YoutubeRoomComponent } from './youtube-room.component';

describe('YoutubeRoomComponent', () => {
  let component: YoutubeRoomComponent;
  let fixture: ComponentFixture<YoutubeRoomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YoutubeRoomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YoutubeRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
