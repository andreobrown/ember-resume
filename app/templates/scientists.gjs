import { pageTitle } from 'ember-page-title';
import PeopleList from '../components/people-list';

<template>
  {{pageTitle "Scientists"}}
  <PeopleList
    @title="List of Scientists"
    @people={{@model}}
  />
</template>
