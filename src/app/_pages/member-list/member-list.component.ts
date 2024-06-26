import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CreateMember } from 'src/app/_interfaces/create-member';
import { Member } from 'src/app/_interfaces/member';
import { MemberService } from 'src/app/_services/member.service';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styles: [],
})
export class MemberListComponent implements OnInit {
  members: Member[] = [];

  forms!: FormGroup;
  error: boolean = false;
  errorMessages: string[] = [];

  show = false;
  showEdit = false;

  constructor(private formBuilder: FormBuilder, private memberService: MemberService) {}

  createForm(){
    this.forms = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required]],
      semester: ['', [Validators.required]],
      career: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.createForm();
    this.memberService.getMembers().subscribe({
      next: (members) => {
        this.members = members;
      },
    });
  }

  async onSubmit(){
    this.error = false;
    this.errorMessages = [];
    console.log(this.forms.value);
    if(this.forms.invalid){
      return;
    }

    const member: CreateMember = this.forms.value;


    const response = this.memberService.createMember(member).subscribe();

    this.ngOnInit();

    console.log(response);

  }
  async OnSubmitEdit(){
    this.error = false;
    this.errorMessages = [];
    console.log(this.forms.value);
    if(this.forms.invalid){
      return;
    }

    const member: CreateMember = this.forms.value;
  }

  get emailInvalid(){
    return this.forms.get('email')?.invalid && this.forms.get('email')?.touched;
  }

  get semesterInvalid(){
    return this.forms.get('semester')?.invalid && this.forms.get('semester')?.touched;
  }

  get nameInvalid(){
    return this.forms.get('name')?.invalid && this.forms.get('name')?.touched;
  }

  get carreerInvalid(){
    return this.forms.get('career')?.invalid && this.forms.get('career')?.touched;
  }

}
