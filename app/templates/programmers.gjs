import { pageTitle } from 'ember-page-title';
import PeopleList from '../components/people-list';

<template>
  {{pageTitle "Programmers"}}
  <PeopleList
    @title="Programmers"
    @people={{@model}}
  />
</template>
