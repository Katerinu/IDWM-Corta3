import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { Member } from '../_interfaces/member';
import { Observable } from 'rxjs';
import { CreateMember } from '../_interfaces/create-member';

@Injectable({
  providedIn: 'root',
})
export class MemberService {
  baseUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) {}

  /**
   * Create a member
   * @param createMember - The member to create
   * @returns Observable<Member> - An observable of the created member
   */
  createMember(createMember: CreateMember): Observable<Member> {
    return this.http.post<Member>(this.baseUrl + '/member', createMember);
  }

  /**
   * Get all members
   * @returns Observable<Member[]> - An observable of an array of members
   */
  getMembers(): Observable<Member[]> {
    return this.http.get<Member[]>(this.baseUrl + '/member');
  }
}
